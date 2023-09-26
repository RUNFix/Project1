import { Auth } from "../interfaces/auth";
import { Employee } from "../interfaces/employee";
import employeeModel from "../models/employee";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken,generateRefreshToken,verifyRefreshToken,verifyToken } from "../utils/jwt.handle";

const registerNewUser = async ({cc, password, fullName, age, position, email, phone}: Employee) => {
    const checkCC = await employeeModel.findOne({cc});
    if(checkCC) return "ALREADY_USER";
    const checkEmail = await employeeModel.findOne({email});
    if(checkEmail) return "ALREADY_EMAIL";
    const checkPhone = await employeeModel.findOne({phone});
    if(checkPhone) return "ALREADY_PHONE";

    const passHash = await encrypt(password);
    const registerNewUser = await employeeModel.create({
        cc, 
        password: passHash,
        fullName, 
        age, 
        position, 
        email, 
        phone })
    return registerNewUser;
};
    
const loginUser = async ({cc, password}: Auth) => {
    const checkIs = await employeeModel.findOne({cc});
    if(!checkIs) return "NOT_FOUND_USER";

    const passHash = checkIs.password;
    const isCorrect = await verified(password, passHash);

    if(!isCorrect) return "PASSWORD_INCORRECT";

    const token = await generateToken(cc);
    const refreshToken = await generateRefreshToken(cc);
    const data ={token,refreshToken,user:checkIs};

    return data
};

const refreshAccessToken = async (refreshToken: string) => {
    try {
        const decoded: any = await verifyRefreshToken(refreshToken);
        const user = await employeeModel.findOne({cc: decoded.cc});
        
        if (!user) return "NOT_FOUND_USER";

        const newAccessToken = await generateToken(user.cc);
        return { token: newAccessToken };
    } catch (error) {
        return "INVALID_REFRESH_TOKEN";
    }
};
 
const updatePassword = async (cc:string, password:Auth) => {

    const checkIs = await employeeModel.findOne({cc});
    if(!checkIs) return "NOT_FOUND_USER";

    // Actualizar la contraseña
    const isCorrect = await verified(password.password, checkIs.password);
    if(isCorrect) return "IS NOT POSIBLE TO OVERRIDE THE PASSWORD WITH THE SAME PASSWORD";


    const newPassHash = await encrypt(password.password);
    const responsePassword = await employeeModel.findOneAndUpdate({cc:cc}, {password:newPassHash}, {new:true,});
    console.log("Password updated successfully");
    return responsePassword;

     
}

export {registerNewUser, loginUser, updatePassword, refreshAccessToken}
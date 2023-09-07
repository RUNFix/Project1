import { Request, Response } from "express";
import { registerNewUser, loginUser} from "../services/auth"
const registerCtrl = async({body}: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser)
};  

const loginCtrl = async({body}: Request, res:Response) => {
    const {cc, password} = body;
    const responseUser = await loginUser({cc, password})
    res.send(responseUser)
};

export {registerCtrl,loginCtrl}

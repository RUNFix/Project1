import { Employee } from "../interfaces/employee";
import employeeModel from "../models/employee";


/*
const insertEmpl= async (employee: Employee) => {
    const responseInsert = await employeeModel.create(employee);
    return responseInsert;
};
*/
const getEmpls = async ()=> {
    const responseEmployee = await employeeModel.find({})
    return responseEmployee;

}

const getEmpl = async (cc:string)=> {
    const responseEmployee = await employeeModel.findOne({cc:cc});
    return responseEmployee;
}

const updateEmpl =  async(cc:string, data:Employee)=>{
    const responseEmployee = await employeeModel.findOneAndUpdate({cc:cc}, data, {new:true,});
    return responseEmployee;
}

const deleteEmpl = async (cc:string)=> {
    const responseEmployee = await employeeModel.deleteOne({cc:cc});
    return responseEmployee;
}

const getEmplfilter = async (name:string)=> {
    const regex = new RegExp(name, "i");
    const responseEmployee = await employeeModel.find({fullName:regex});
    return responseEmployee;
}

const getEmplfilterName = async ()=> {
    const responseEmployee = await employeeModel.find({}).sort({ fullName: 1 });
    return responseEmployee;

}

const getEmployeesByPosition = async () => {
    const employees = await employeeModel.find({}).sort({ position: 1 });
    return employees;
};

export { getEmpls, getEmpl, updateEmpl, deleteEmpl, getEmplfilter, getEmplfilterName, getEmployeesByPosition};

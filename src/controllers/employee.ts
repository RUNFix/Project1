import { NextFunction, Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import {
  getEmpls,
  getEmpl,
  updateEmpl,
  deleteEmpl,
  getEmplfilter,
  getEmplfilterName,
  getEmployeesByPosition,
  insertEmpl,
} from '../services/employee';

const getEmployee = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getEmpl(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM');
  }
};

const getEmployees = async (req: Request, res: Response) => {
  try {
    const response = await getEmpls();
    console.log('ESTOY BUSCANDO EMPLEADOS')
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEMS');
  }
};

const updateEmployee = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await updateEmpl(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_ITEM');
  }
};

const getEmployeeFilter = async ({ params }: Request, res: Response) => {
  try {
    const { name } = params;
    const response = await getEmplfilter(name);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_EMPLOYEE');
  }
};

const getEmployeesFilterName = async (req: Request, res: Response) => {
  try {
    const response = await getEmplfilterName();
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_EMPLOYEE');
  }
}
const getEmployeesFilterPosition = async (req: Request, res: Response) => {
  try {
    const response = await getEmployeesByPosition();
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_EMPLOYEES');
  }
};


const postEmployee=async ({body}:Request, res:Response)=>{
    try{
        const response= await insertEmpl(body);
        res.send(response)
    }catch(e){
        console.error("Error al insertar empleado:", e);
        handleHttp(res, 'ERROR_POST_ITEM');
    }
}



const deleteEmployee= async({params}:Request, res:Response, next: NextFunction)=>{
    try{
        const {id} = params;
        const response = await deleteEmpl(id);
        res.send(response);
    }catch(e){
        handleHttp(res, 'ERROR_DELETE_ITEM');
    }
}




export{postEmployee,getEmployee, getEmployees, updateEmployee, deleteEmployee, getEmployeeFilter, getEmployeesFilterName,getEmployeesFilterPosition};


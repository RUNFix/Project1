import { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertBill, getUserBills ,getBill, getCarBills, getBills, updateBill, deleteBill} from "../services/bill"
import {getVehl} from "../services/vehicle"
import {updatePriceToPay, getRepair} from "../services/repair"
import { getClient } from "../services/client"
import { Bill } from "../interfaces/bill"
//If param is a cc, then search by user, if it is a plate, search by car
const getBillsByParam = async ({params}:Request, res: Response) => {
    try{
        const {param}=params;
        
        //console.log(param)
        if(Number.isNaN(Number(param))){//if param is a plate
            const responseGet= await getCarBills(param);
                
            if(responseGet.length){
                res.send(responseGet);
            }else{res.send('NOT_BILLS_FOR_THIS_CAR')}

        }else{//if param is a cc
            const responseGet= await getUserBills(Number(param));
            if(responseGet.length){
                res.send(responseGet);
            }else{res.send('NOT_BILLS_FOR_THIS_USER')}
        }
    }catch (e){
        handleHttp(response,'ERROR_GET_BILLS')
    }
}

const getBillsController = async (req:Request, res: Response)=> {
    try{
        const responseGet = await getBills();
        res.send(responseGet);
    }catch (e){
        handleHttp(response,'ERROR_GET_BILL')
    }
}

const updateBillController = async ({params, body}:Request, res: Response)=> {
    try{
        const {id} = params;
        const responseUpdate = await updateBill(id,body);
        res.send(responseUpdate);
    }catch (e){
        handleHttp(response,'ERROR_UPDATE_BILL')
    }
}

const postBill = async ({body}:Request, res: Response)=> {
    try{
    
        const responseBill = await insertBill(body);
        if (responseBill === "VEHICLE_DOES_NOT_EXIST" || responseBill === "CLIENT_DOES_NOT_EXIST") {
            return res.status(400).send({ message: responseBill});
        }
        //logic for updating the vehicle table
        const {plate} = body;
        const {total} = body;
        const {cc} = body;
        const updatedPrice = await updatePriceToPay(plate, cc, total,1)
        if((responseBill!==null)&&(updatedPrice!==null)){
            res.send(body)
        }else{
            //this undo whatever half of the operation was done
            if((typeof responseBill) !== 'string') deleteBill(responseBill.id);
            if(updatedPrice) updatePriceToPay(plate, cc, total,-1);
            throw new Error();
        }
    }catch (e){
        handleHttp(res,'ERROR_POST_BILL',e)
    }
}

const deleteBillController = async ({params}:Request, res: Response)=> {
    try{
        const {id}=params;
        const responseDelete = await deleteBill(id);
        if(responseDelete){
            res.send("SUCCESSFULLY_DELETED");
        }else{res.send("BILL_NOT_FOUND");}
    }catch (e){
        handleHttp(response,'ERROR_DELETE_BILL')
    }
}

/**
 * 
 * @param req needs a bill _id for consult 
 */
const getFullBillController = async ({params}:Request, res: Response) => {
    try{
        const {id} = params;
        const resBill:any = await getBill(id);
        if(!resBill) throw new Error('NOT_VALID_BILL_ID')
        const {plate, cc} = resBill;
        
        const resVeh = await getVehl(plate);
        
        const resClient = await getClient(cc);
        
        const resRepair = await getRepair(plate, cc);

        //if all data gathered
        if(resBill && resVeh && resClient && resRepair){
            res.send({
                //bill data
                state: resBill.state,
                plate: resBill.plate,
                cc: resBill.cc,
                items: resBill.items,
                //client data
                name: resClient.name,
                lastname: resClient.lastname,
                email: resClient.email,
                phoneNumer: resClient.phoneNumber,
                //vehicle data
                model: resVeh.model,
                brand: resVeh.brand,
                year: resVeh.year,
                color: resVeh.color,
                //repair data
                status: resRepair.status,
                priceToPay: resRepair.priceToPay,
                employee: resRepair.employee,
            });
        }else{
            let error = ''
            if(resBill === null) error = 'NOT_BILL'
            if(resVeh === null) error = 'NOT_VEHICLE'
            if(resClient === null) error = 'NOT_CLIENT'
            if(resRepair === null) error = 'NOT_REPAIR'
            throw new Error(error)
        }
    }catch (e) {
        handleHttp(response,'ERROR_GET_FULL_BILL',e) 
    }
    
    
}

export { updateBill, postBill, deleteBill, getFullBillController, getBillsController,getBillsByParam, updateBillController,deleteBillController};
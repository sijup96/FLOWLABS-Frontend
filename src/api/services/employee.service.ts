import axiosReq from "../axios.config"
import { employeeEndPoints } from "../endpoints"



export const employee={
    add:async (data:object)=>{
        await axiosReq.post(employeeEndPoints.add,data)
    }
}
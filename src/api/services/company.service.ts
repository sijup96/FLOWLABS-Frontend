import axiosReq from "../axios.config"
import { companyEndPoints } from "../endpoints"



export const company={
    login:async(body:{email:string,password:string,domainName:string})=>{
       const response= await axiosReq.post(companyEndPoints.login(body.domainName),body)
       return response.data
    },
    resetPassword:async(body:{password:string,domainName:string})=>{
        await axiosReq.post(companyEndPoints.resetPassword(body.domainName),body)
    }
}
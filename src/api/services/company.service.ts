import axiosReq from "../axios.config"
import { companyEndPoints } from "../endpoints"
import { CompanyInfo } from "@/screens/company/CompanyProfile"



export const company={
    login:async(body:{email:string,password:string,domainName:string})=>{
       const response= await axiosReq.post(companyEndPoints.login,body)
       return response.data
    },
    resetPassword:async(body:{password:string,domainName:string})=>{
        await axiosReq.put(companyEndPoints.resetPassword,body)
    },
    getDomainName:async():Promise<string>=>{
        const response=await axiosReq.get(companyEndPoints.getDomainName)
        return response.data.domainName
    },
    getCompanyInfo:async()=>{
        const response=await axiosReq.get(companyEndPoints.getCompanyInfo)
        return response.data
    },
    updateCompany:async(body:Partial<CompanyInfo>)=>{
        await axiosReq.put(companyEndPoints.updateCompany,body)
    },
    updateCompanyLogo:async(formData:FormData)=>{
        await axiosReq.post(companyEndPoints.updateCompanylogo,formData)
    }
}
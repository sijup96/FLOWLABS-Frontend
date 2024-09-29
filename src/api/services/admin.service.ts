import axiosReq from "../axios.config"
import { adminEndpoints } from "../endpoints"

// Admin
const admin={
    login:async (body:{email:string,password:string})=>{
            await axiosReq.post(adminEndpoints.login,body)
    },
    userRequests:async()=>{
        const response=await axiosReq.get(adminEndpoints.userRequests)
        return response.data.data
    },
    approvelRequest:async(body:{isApproved:boolean,companySlug:string})=>{
        await axiosReq.post(adminEndpoints.approvelRequests,body)
    }
}
export default admin
import axiosReq from "../axios.config"
import { adminEndpoints } from "../endpoints"

// Admin
const admin={
    login:async (body:{email:string,password:string})=>{
            await axiosReq.post(adminEndpoints.login,body)
    },
}

export default admin
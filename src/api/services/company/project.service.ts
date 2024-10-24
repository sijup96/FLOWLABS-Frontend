import axiosReq from "@/api/axios.config"
import { companyProjectEndPoints } from "@/api/endpoints"

const companyProject={
    create:async (data:object)=>{
        await axiosReq.post(companyProjectEndPoints.create,data)
    }
}


export default companyProject
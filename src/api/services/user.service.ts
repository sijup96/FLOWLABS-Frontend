import axiosReq from "../axios.config"
import { userEndPoints } from "../endpoints"


const user = {
    verifyEmail: async (body: { email: string }) => {
        await axiosReq.post(userEndPoints.verifyEmail, body)
    },
    signUp: async (body: object) => {
        await axiosReq.post(userEndPoints.signUp, body)
    },
    googleAuth: async (body: object) => {
        await axiosReq.post(userEndPoints.googleAuth, body)
    }
}

export default user
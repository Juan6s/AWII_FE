import axios from "../config/request.config"

import { getToken } from "./auth.service";

export async function getGuestData(){
    const token = await getToken()
    const response = await axios.get("http://localhost:3000/inquilinos", {headers: {Authorization: token}})
    return response.data
}       
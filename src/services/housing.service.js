import axios from "./request.service"

import { getToken } from "./auth.service";

export async function getHousingData(){
    const token = await getToken();
    const response = await axios.get("http://localhost:3000/hospedaje", {headers: {Authorization: token}})
    return response.data
}   
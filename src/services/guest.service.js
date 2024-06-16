import axios from "axios";

export async function getGuestData(){
    const response = await axios.get("http://localhost:3000/inquilinos")
    return response.data
}       
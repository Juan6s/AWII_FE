import axios from "axios";

export async function getHousingData(){
    const response = await axios.get("http://localhost:3000/hospedaje")
    return response.data
}   
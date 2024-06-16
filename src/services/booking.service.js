import axios from "axios";

export async function getBookingData(){
    const response = await axios.get("http://localhost:3000/reserva")
    return response.data
}   
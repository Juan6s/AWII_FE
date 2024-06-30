import axios from 'axios';
import { getToken } from "./auth.service";

export async function getBookingData() {
  const token = await getToken();
  const response = await axios.get('http://localhost:3000/reserva', {
    headers: { Authorization: token }
  });
  return response.data;
}

export async function createBooking(startDate, endDate, guestId, housingId) {
  const token = await getToken();
  const data = {
    checkInDate: startDate.toISOString(),
    checkOutdate: endDate.toISOString(),
    guest: guestId,
    housing: housingId
  };
  const respoonse = await axios.post('http://localhost:3000/reserva', data, {
    headers: { Authorization: token }
  });
}

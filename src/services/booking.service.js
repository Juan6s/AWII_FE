import axios from 'axios';

export async function getBookingData() {
  const response = await axios.get('http://localhost:3000/reserva');
  return response.data;
}

export async function createBooking(startDate, endDate, guestId, housingId) {
  const data = {
    checkInDate: startDate.toISOString(),
    checkOutdate: endDate.toISOString(),
    guest: guestId,
    housing: housingId
  };
  console.log(data);
  const respoonse = await axios.post('http://localhost:3000/reserva', data);
}

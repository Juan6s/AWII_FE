import axios from 'axios';

export async function getBookingData() {
  const response = await axios.get('http://localhost:3000/reserva');
  return response.data;
}

export async function createBooking(startDate, endDate, guestId, housingId) {

  const data = {
    reserva: {
        id_inquilino: guestId,
        id_hospedaje: housingId,
        fecha_ingreso: startDate,
        fecha_egreso: endDate
    },
    acompanantes: []
  };
  console.log(data)
  const respoonse = await axios.post('http://localhost:3000/reserva', data);
}

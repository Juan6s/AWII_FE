import axios from '../config/request.config';

import { getToken } from './auth.service';

export async function getGuestData() {
  const token = await getToken();
  const response = await axios.get('http://localhost:3000/inquilinos', {
    headers: { Authorization: token }
  });
  return response.data;
}

export async function createGuest(name, phone, dni) {
  const token = await getToken();
  const response = await axios.post(
    'http://localhost:3000/inquilinos',
    { name, phone, dni },
    { headers: { Authorization: token } }
  );
}

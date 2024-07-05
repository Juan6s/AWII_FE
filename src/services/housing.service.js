import axios from '../config/request.config';

import { getToken } from './auth.service';

export async function getHousingData() {
  const token = await getToken();
  const response = await axios.get('http://localhost:3000/hospedaje', {
    headers: { Authorization: token }
  });
  return response.data;
}

export async function createHousing(name, pricing, location) {
  const token = await getToken();
  const response = await axios.post(
    'http://localhost:3000/hospedaje',
    { name, pricing, location },
    { headers: { Authorization: token } }
  );
}

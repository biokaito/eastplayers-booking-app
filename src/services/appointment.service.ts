import { API_ROUTES } from '@/Constants/api.routes';
import axios from 'axios';

export async function createAppointment(payload: any) {
  const response = await axios.post(API_ROUTES.APPOINTMENT.BASE, payload);
  return response.data;
}
import { API_ROUTES } from '@/Constants/api.routes';
import axios from 'axios';

// Fetch all packages
export async function fetchPackages() {
  const response = await axios.get(API_ROUTES.PACKAGE.BASE);
  return response.data;
}
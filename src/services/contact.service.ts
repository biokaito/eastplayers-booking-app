import { API_ROUTES } from '@/Constants/api.routes';
import { Contact } from '@/models/contact.model';
import axios from 'axios';

// Fetch all contacts
export async function fetchContacts() {
  const response = await axios.get(API_ROUTES.CONTACT.BASE);
  return response.data;
}

// Create a new contact
export async function createContact(contact: Contact) {
  const response = await axios.post(API_ROUTES.CONTACT.BASE, contact);
  return response.data;
}
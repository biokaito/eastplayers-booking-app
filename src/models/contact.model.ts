
export interface Contact {
  id?: string |number; // Optional, as it may not be present when creating a new contact
  name: string;
  email: string;
  phone: string;
  additionalPhone?: string;
  note?: string;
}
import { Contact } from '@/models/contact.model';
import { NextResponse } from 'next/server';

// This is a mock database for demonstration purposes
const mockDatabase: { contacts: Contact[] } = {
  contacts:[
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "123-456-7890",
    additionalPhone: "321-654-0987",
    note: "Interested in summer camp."
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-123-4567",
    additionalPhone: "",
    note: "Asked about group discounts."
  },
  {
    id: 3,
    name: "Carol Lee",
    email: "carol@example.com",
    phone: "987-654-3210",
    additionalPhone: "888-777-6666",
    note: ""
  }
]
}

const contacts: Contact[] = [
  ...mockDatabase.contacts
]; // Local in-memory "DB"

let nextId = 4;

export async function GET() {
  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newContact: Contact = {
    id: nextId++,
    name: data.name,
    email: data.email,
    phone: data.phone,
    additionalPhone: data.additionalPhone || '',
    note: data.note || '',
  };
  contacts.push(newContact);
  return NextResponse.json(newContact, { status: 201 });
}

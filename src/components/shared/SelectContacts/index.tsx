import { Contact } from "@/models/contact.model";
import { Button, Spin } from "antd";
import clsx from "clsx";
import { Plus, Search, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface ISelectContactsProps {
  onSelectContact: (contact: Contact) => void;
  loading?: boolean;
  contacts?: Contact[];
  close: () => void;
  handleAddContact?: () => void;
}

const SelectContacts: FC<ISelectContactsProps> = ({ onSelectContact, close, contacts, loading, handleAddContact }) => {
  const [rawContacts, setRawContacts] = useState<Contact[]>(contacts || []);
  const [selectedRowKey, setSelectedRowKey] = useState<string | number>('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts || []);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = rawContacts.filter(contact =>
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.phone.toLowerCase().includes(term)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(rawContacts);
    }
  }

  const handleRowClick = (contact: Contact) => {
    setSelectedRowKey(contact?.id || '');
  }

  const handleSelectContact = () => {
    const selectedContact = filteredContacts.find(contact => contact.id === selectedRowKey);
    if (selectedContact) {
      onSelectContact(selectedContact);
      close();
    }
  }

  useEffect(() => {
    if (contacts?.length) {
      setRawContacts([...contacts]);
      setFilteredContacts([...contacts]);
    }
  }, [contacts]);

  return <div className="w-full bg-[#1e2028] flex flex-col h-full">
    <div className="flex justify-between items-center px-5 py-3 border-b border-[#2a2c36]">
      <h2 className="text-white font-semibold text-base">Contact</h2>
      <Button type="text" onClick={close} icon={<X className="text-white text-xl leading-none hover:text-gray-400" color="white" />} />
    </div>
    <div className="px-5 py-3">
      <div className="relative grid grid-cols-12">
        <input
          onChange={handlerSearch}
          type="text"
          placeholder="Search by name, phone number or email"
          className="col-span-11 w-full bg-[#2a2c36] rounded-md py-2 pl-10 pr-12  text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 ">
          <Search className="w-5 h-5" />
        </span>
        <div className="flex justify-end">
          <Button onClick={handleAddContact} aria-label="Add contact" className="w-12 h-12 border border-blue-600 rounded-md text-blue-600 font-semibold text-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" type={'text'}>
            <Plus size={50} />
          </Button>
        </div>
      </div>
    </div>
    <div className="overflow-y-auto scrollbar-thin flex-1 p-4">
      <table className="w-full text-gray-400 border-separate border-spacing-y-1 rounded-lg border border-gray-500">
        <thead className="bg-[#2a2c36] text-gray-400">
          <tr>
            <th className="text-left px-5 py-4 font-normal">Name</th>
            <th className="text-left px-5 py-4 font-normal">Email</th>
            <th className="text-left px-5 py-4 font-normal">Phone</th>
            <th className="text-left px-5 py-4 font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && filteredContacts.map((contact, index) => (
            <tr
              className={clsx("text-white font-semibold cursor-pointer", selectedRowKey === contact.id ? "bg-[#16407a]" : 'bg-[#1e2028]')}
              key={index}
              onClick={() => handleRowClick(contact)}
            >
              <td className="px-5 py-4">{contact.name}</td>
              <td className="px-5 py-4 text-blue-300 underline cursor-pointer">{contact.email}</td>
              <td className="px-5 py-4">{contact.phone}</td>
              <td className="px-5 py-4">
                <input type="checkbox" checked={selectedRowKey === contact.id} className="w-4 h-4 text-blue-600 rounded border-gray-300" />
              </td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                <span className="text-gray-400">Loading... <Spin /></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between items-center px-5 py-3 border-t border-[#2a2c36]">
      <button
        onClick={close}
        type="button"
        className=" text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-600 hover:text-white transition"
      >
        Cancel
      </button>
      <Button
        disabled={!selectedRowKey}
        onClick={handleSelectContact}
        className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 transition text-white"
      >
        Select
      </Button>
    </div>
  </div >
}

export default SelectContacts;
import { Contact } from "@/models/contact.model";
import { createContact } from "@/services/contact.service";
import { Button, notification } from "antd";
import { X } from "lucide-react";
import { FC, useState } from "react";

interface IAddContactProps {
  onAddContact: (contact: Contact) => void;
  close: () => void;
}

const AddContact: FC<IAddContactProps> = ({ onAddContact, close }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddContact = async (contact: Contact) => {
    setLoading(true);
    try {
      const data = await createContact(contact);

      notification.success({
        message: "Contact Added",
        description: `Contact ${data.name} has been successfully added.`,
      });
      onAddContact(data);
      close();
    } catch (error) {
      console.error("Failed to add contact:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contact: Contact = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      additionalPhone: formData.get("additionalPhone") as string,
      note: formData.get("note") as string,
    };
    handleAddContact(contact);
  };

  return (
    <div className="bg-[#1a1a1a] flex items-start justify-center p-4 h-full">
      <div className="flex flex-col justify-between w-full max-w-md bg-[#1a1a1a] text-white rounded-md p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-white text-lg leading-6">Add Contact</h2>
          <Button type="text" onClick={close} icon={<X className="text-white text-xl leading-none hover:text-gray-400" color="white" />} />
        </div>
        <p className="text-gray-300 text-base mb-6 leading-tight">
          Please enter at least one field: email or phone number.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-base font-semibold mb-1">
              Name <span className="text-[#ff4d4f]">*</span>
            </label>
            <input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="w-full bg-[#2c2c3a] text-gray-400 text-base rounded-md py-2 px-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 text-base font-semibold mb-1">Email<span className="text-[#ff4d4f]">*</span></label>
            <input
              required
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full bg-[#2c2c3a] text-gray-400 text-base rounded-md py-2 px-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-300 text-base font-semibold mb-1">Phone Number<span className="text-[#ff4d4f]">*</span></label>
            <input
              required
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              className="w-full bg-[#2c2c3a] text-gray-400 text-base rounded-md py-2 px-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="additionalPhone" className="block text-gray-300 text-base font-semibold mb-1">Additional Phone Number</label>
            <input
              id="additionalPhone"
              type="tel"
              name="additionalPhone"
              placeholder="Phone number"
              className="w-full bg-[#2c2c3a] text-gray-400 text-base rounded-md py-2 px-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="note" className="block text-gray-300 text-base font-semibold mb-1">Note</label>
            <input
              id="note"
              name="note"
              type="text"
              placeholder="Enter"
              className="w-full bg-[#2c2c3a] text-gray-400 text-base rounded-md py-2 px-3 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={close}
              type="button"
              className="text-blue-600 text-base font-normal border border-blue-600 rounded px-3 py-1 hover:bg-blue-600 hover:text-white transition"
            >
              Cancel
            </button>
            <Button
              loading={loading}
              type="text"
              htmlType="submit"
              className="bg-blue-600 text-white text-base font-normal rounded hover:bg-blue-700 transition"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddContact;
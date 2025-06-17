import AddContact from "@/components/shared/AddContact";
import SelectContacts from "@/components/shared/SelectContacts";
import { RestyledDrawer } from "@/components/UI/RestyledDrawer";
import { Contact } from "@/models/contact.model";
import { fetchContacts } from "@/services/contact.service";
import { Button, Drawer, notification } from "antd";
import { Plus, Search, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

// Dummy data for dropdowns
const YEAR_OPTIONS = [
  "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"
];

const MAKE_OPTIONS = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Hyundai", "Kia", "Volkswagen"
];

const MODEL_OPTIONS = [
  "Corolla", "Civic", "F-150", "Silverado", "Altima", "3 Series", "C-Class", "Elantra", "Sorento", "Jetta"
];

const VEHICLE_TYPE_OPTIONS = [
  "Sedan", "SUV", "Truck", "Coupe", "Convertible", "Van", "Wagon", "Hatchback"
];

interface ClientInformation {
  client: Contact | null;
  year: string;
  make: string;
  model: string;
  vehicleType: string;
}

export interface IClientInformationProps {
  submit: (data: ClientInformation) => void;
  defaultValues?: any;
}

const ClientInformation: FC<IClientInformationProps> = ({ submit, defaultValues }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState({
    year: YEAR_OPTIONS,
    make: MAKE_OPTIONS,
    model: MODEL_OPTIONS,
    vehicleType: VEHICLE_TYPE_OPTIONS
  })

  const [state, setState] = useState<ClientInformation>({
    client: null,
    year: '',
    make: '',
    model: '',
    vehicleType: ''
  });
  const [availableContacts, setAvailableContacts] = useState<Contact[]>([]);

  // Add contact modal state
  const [openAddContact, setOpenAddContact] = useState<boolean>(false);

  const showAddContactModal = () => setOpenAddContact(true);
  const hideAddContactModal = () => setOpenAddContact(false);

  // Select contact modal state
  const [openSelectContact, setOpenSelectContact] = useState(false);

  const showSelectContactModal = () => setOpenSelectContact(true);
  const hideSelectContactModal = () => setOpenSelectContact(false);

  const getAvailableContacts = async () => {
    setLoading(true);
    try {
      const data = await fetchContacts();
      setAvailableContacts([...data]);
      console.log("Available contacts:", data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch contacts:", error);
    }
  }

  const handleAddContact = (contact: Contact) => {
    console.log('Contact added:', contact);

    const currentContacts = [...availableContacts];
    const newContacts = [...currentContacts, contact];
    setAvailableContacts([...newContacts]);
    hideAddContactModal();
  }

  const handleClickAddContact = () => {
    hideSelectContactModal();
    showAddContactModal();
  }

  const handleSelectContact = (contact: Contact) => {
    setState(prevState => ({
      ...prevState,
      client: contact
    }));
  }

  const handleClearContact = () => {
    setState(prevState => ({
      ...prevState,
      client: null
    }));
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const validateStep = () => {
    console.log("Validating step with state:", state);
    if (!state.client) {
      notification.warning({
        message: "Warning",
        description: "Please select a contact before proceeding.",
      });
      return false;
    }
    if (!state.year || !state.make || !state.model || !state.vehicleType) {
      notification.warning({
        message: "Warning",
        description: "Please fill in all vehicle details.",
      });
      return false;
    }

    return true;
  }

  const onClickNext = () => {
    const isValid = validateStep();
    if (isValid) {
      // Proceed to the next step
      submit(state);
    }

  }

  useEffect(() => {
    getAvailableContacts();
  }, [])

  useEffect(() => {
    if (defaultValues) {
      setState({
        client: defaultValues.client || null,
        year: defaultValues.year || '',
        make: defaultValues.make || '',
        model: defaultValues.model || '',
        vehicleType: defaultValues.vehicleType || ''
      });
    }
  }, [defaultValues]);

  return (
    <div className=" flex-1 p-2 overflow-auto">
      <h2 className="text-white font-semibold text-2xl mb-6 select-none">
        Client Information
      </h2>
      <form className="w-full bg-[#18181B] p-6 rounded-lg">
        <label className="block text-white font-semibold text-sm mb-1 select-none" htmlFor="contact">
          Contact
          <span className="text-red-600">
            *
          </span>
        </label>
        <div className="flex gap-2 mb-6">
          {!state?.client && (
            <>
              <select onClick={showSelectContactModal} className="flex-1 bg-[#2a2a3a] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none" id="contact" name="contact">
                <option>Select</option>
              </select>
              <Button onClick={showAddContactModal} aria-label="Add contact" className="w-12 h-12 border border-blue-600 rounded-md text-blue-600 font-semibold text-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" type={'text'}>
                <Plus className="w-5 h-5" />
              </Button>
            </>
          )}
          {
            state?.client && (
              <div className="flex-1 text-white text-sm rounded-md px-4 py-3 flex items-center gap-2">
                <span className="text-gray-300 text-sm mr-4">client</span> {state.client.name} | {state.client.email} | {state.client.phone}
                <Button onClick={handleClearContact} aria-label="Change contact" className="ml-2 text-blue-600 hover:text-blue-700" type={'text'}>
                  <X size={20} color="red" />
                </Button>
              </div>
            )
          }
        </div>
        <div className="text-white font-semibold text-sm select-none mb-6" id="vehicle-detail-label">
          Vehicle Detail
        </div>
        <fieldset aria-labelledby="vehicle-detail-label" className="border border-[#222222] rounded-lg p-4 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold text-xs mb-1 select-none" htmlFor="year">
                Year
                <span className="text-red-600">
                  *
                </span>
              </label>
              <select value={state.year} onChange={handleSelectChange} className="w-full bg-[#2a2a3a] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none" id="year" name="year">
                {/* <div className="relative grid grid-cols-12">
                  <input
                    type="text"
                    placeholder="Search"
                    className="col-span-11 w-full bg-[#2a2c36] rounded-md py-2 pl-10 pr-12  text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 ">
                    <Search className="w-5 h-5" />
                  </span>
                </div> */}
                <option >
                  Select
                </option>
                {
                  options.year.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))
                }
              </select>
            </div>
            <div>
              <label className="block text-white font-semibold text-xs mb-1 select-none" htmlFor="make">
                Make
                <span className="text-red-600">
                  *
                </span>
              </label>
              <select value={state.make} onChange={handleSelectChange} className="w-full bg-[#2a2a3a] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none" id="make" name="make">
                <option >
                  Select
                </option>
                {
                  options.make.map((make, index) => (
                    <option key={index} value={make}>
                      {make}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold text-xs mb-1 select-none" htmlFor="model">
              Model
              <span className="text-red-600">
                *
              </span>
            </label>
            <select value={state.model} onChange={handleSelectChange} className="w-full bg-[#2a2a3a] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none" id="model" name="model">
              <option >
                Select
              </option>
              {
                options.model.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))
              }
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold text-xs mb-1 select-none" htmlFor="vehicleType">
              Vehicle Type
              <span className="text-red-600">
                *
              </span>
            </label>
            <select value={state.vehicleType} onChange={handleSelectChange} className="w-full bg-[#2a2a3a] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none" id="vehicleType" name="vehicleType">
              <option >
                Select
              </option>
              {
                options.vehicleType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))
              }
            </select>
          </div>
        </fieldset>
        <p className="text-blue-700 text-xs mb-6 cursor-pointer select-none max-w-max">
          Can't find a vehicle? Enter it manually.
        </p>
        <div className="flex justify-end">
          <button onClick={onClickNext} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded px-5 py-3 transition-colors" type="button">
            Next
          </button>
        </div>
      </form>

      {/* Create new contact modal */}
      <RestyledDrawer
        closable={false}
        onClose={hideAddContactModal}
        open={openAddContact}
        destroyOnClose
        destroyOnHidden
      >
        <AddContact
          onAddContact={handleAddContact}
          close={hideAddContactModal}
        />
      </RestyledDrawer>

      {/* Select contact modal */}
      <RestyledDrawer
        closable={false}
        onClose={hideSelectContactModal}
        open={openSelectContact}
        destroyOnClose
        destroyOnHidden
        width={'50%'}
      >
        <SelectContacts
          loading={loading}
          contacts={availableContacts}
          onSelectContact={handleSelectContact}
          close={hideSelectContactModal}
          handleAddContact={handleClickAddContact}
        />
      </RestyledDrawer>
    </div>)
}

export default ClientInformation;
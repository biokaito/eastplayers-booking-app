"use client";

import SelectPackages from "@/components/shared/SelectPackages";
import { RestyledDrawer } from "@/components/UI/RestyledDrawer";
import { Package } from "@/models/package.model";
import { fetchPackages } from "@/services/package.service";
import { Image, notification } from "antd";
import { Trash } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface IServiceProps {
  submit: (data: any) => void;
  defaultValues?: Package[];
}

const Services: FC<IServiceProps> = ({ submit, defaultValues }) => {
  const [availableServices, setAvailableServices] = useState<Package[]>([]);
  const [selectedServices, setSelectedServices] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [openSelectPackageModal, setOpenSelectPackageModal] = useState<boolean>(false);
  const showSelectPackageModal = () => {
    setOpenSelectPackageModal(true);
  }
  const closeSelectPackageModal = () => {
    setOpenSelectPackageModal(false);
  }

  const handleSelectPackages = (selectedPackages: any[]) => {
    console.log("Selected Packages:", selectedPackages);
    setSelectedServices([...selectedPackages]);
  }

  const handleRemovePackage = (selectedPackage: Package) => {
    const newSelectedSerivces = selectedServices.filter(pkg => pkg.id !== selectedPackage.id);
    setSelectedServices([...newSelectedSerivces]);
  }

  const fetchAvailableServices = async () => {
    setLoading(true);
    try {
      const data = await fetchPackages();
      console.log("Available Services:", data);
      setAvailableServices([...data]);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);

    }
  }

  const handleSubmit = () => {
    if (selectedServices?.length === 0) {
      notification.warning({
        message: "No services selected",
        description: "Please select at least one service to proceed.",
        duration: 2,
      })
      return;
    }
    submit(selectedServices);
  }

  useEffect(() => {
    fetchAvailableServices()
  }, [])

  useEffect(() => {
    if (defaultValues?.length) {
      setSelectedServices([...defaultValues]);
    }
  }, [defaultValues]);

  return (<div className=" flex-1 p-2 overflow-auto">
    <h2 className="text-white font-semibold text-2xl mb-6 select-none">
      Services
    </h2>
    <form className="w-full bg-[#18181B] p-6 rounded-lg">
      <label className="block text-white font-semibold text-sm mb-1 select-none" htmlFor="packages">
        Add Packages
        <span className="text-red-600">
          *
        </span>
      </label>
      <div className="flex gap-2 mb-6">
        <select onClick={showSelectPackageModal} className="flex-1 bg-[#2a2a3a] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none" id="contact" name="contact">
          <option>Select</option>
        </select>
      </div>
      <div className="flex space-x-2 mb-6">
        <button className="bg-[#1e40af] text-white text-xs font-semibold rounded-md px-4 py-1.5 focus:outline-none" type="button">
          All
        </button>
        <button className="border border-[#3f3f46] text-[#a1a1aa] text-xs font-semibold rounded-md px-4 py-1.5 focus:outline-none" type="button">
          Service name
        </button>
        <button className="border border-[#3f3f46] text-[#a1a1aa] text-xs font-semibold rounded-md px-4 py-1.5 focus:outline-none" type="button">
          Service name
        </button>
      </div>

      {
        selectedServices?.length > 0 && <div className="overflow-x-auto scrollbar-thin max-h-[420px] border border-[#3f3f46] rounded-md"><table className="min-w-full border-collapse table-fixed text-left text-xs">
          <thead className="bg-[#2a2a3d] sticky top-0 z-10">
            <tr>
              <th className="w-[30%] py-3 px-3 font-semibold text-[#a1a1aa]">
                Package Name
              </th>
              <th className="w-[20%] py-3 px-3 font-semibold text-[#a1a1aa]">
                Service
              </th>
              <th className="w-[15%] py-3 px-3 font-semibold text-[#a1a1aa]">
                Price
              </th>
              <th className="w-[20%] py-3 px-3 font-semibold text-[#a1a1aa]">
                Estimated Time
              </th>
              <th className="w-[15%] py-3 px-3 font-semibold text-[#a1a1aa] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedServices?.map((pkg) => (
              <tr className="border-t border-[#3f3f46]">
                <td className="py-3 px-3 flex items-center space-x-3">
                  <img alt="Red car product image" className="w-10 h-10 rounded" height="40" src={pkg.thumbnail} width="40" />
                  <span className="font-semibold text-white text-[13px] leading-tight">
                    {pkg.name}
                  </span>
                </td>
                <td className="py-3 px-3 text-[#a1a1aa] text-[13px]">
                  {pkg?.services?.length ? pkg.services.map(service => service).join(', ') : 'No services'}
                </td>
                <td className="py-3 px-3">
                  <input className="w-20 bg-[#2a2a3d] text-white text-xs rounded-md px-2 py-1 border border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-blue-600" type="text" value={`$${pkg.price}`} />
                </td>
                <td className="py-3 px-3 flex items-center space-x-1 text-[#a1a1aa] text-xs">
                  {(() => {
                    const hours = Math.floor((pkg.duration || 0) / 60);
                    const mins = (pkg.duration || 0) % 60;
                    return (
                      <>
                        <input
                          className="w-8 bg-[#2a2a3d] text-white rounded-md px-1 py-1 border border-[#3f3f46] text-center focus:outline-none focus:ring-1 focus:ring-blue-600"
                          type="text"
                          value={hours}
                          readOnly
                        />
                        <span>hours</span>
                        <input
                          className="w-10 bg-[#2a2a3d] text-white rounded-md px-1 py-1 border border-[#3f3f46] text-center focus:outline-none focus:ring-1 focus:ring-blue-600"
                          type="text"
                          value={mins}
                          readOnly
                        />
                        <span>mins</span>
                      </>
                    );
                  })()}
                </td>
                <td className="py-3 px-3 text-center">
                  <button onClick={() => handleRemovePackage(pkg)} aria-label="Delete row" className="text-red-600 hover:text-red-700 focus:outline-none" type="button">
                    <Trash size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      }
      {
        selectedServices?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-5">
            <Image preview={false} src="/images/empty-service.png" />
            <div className="text-center py-4 text-gray-400">
              The selected packages will appear here.
            </div>
          </div>
        )
      }
      <div className="flex justify-between mt-6">
        <button className="border border-[#1e40af] text-[#1e40af] text-xs font-semibold rounded-md px-6 py-2 focus:outline-none" type="button">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-[#1e40af] text-white text-xs font-semibold rounded-md px-6 py-2 focus:outline-none" type="button">
          Next
        </button>
      </div>
    </form>

    {/* Selecting Services Modal */}
    <RestyledDrawer
      closable={false}
      onClose={closeSelectPackageModal}
      open={openSelectPackageModal}
      destroyOnClose
      destroyOnHidden
      width={'50vw'}
    >
      <SelectPackages
        close={closeSelectPackageModal}
        onSelectPackages={handleSelectPackages}
        packages={availableServices}
        loading={loading}
      />
    </RestyledDrawer>
  </div>)
}

export default Services;
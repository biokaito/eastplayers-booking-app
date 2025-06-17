import { Package } from "@/models/package.model";
import { FC } from "react";

interface IServiceCardProps {
  item: Package
}

const ServiceCard: FC<IServiceCardProps> = ({ item }) => {
  return (
    <div className="max-w-sm w-full bg-[#2A2B35] rounded-xl p-5 text-white">
      <div className="flex items-center space-x-4 mb-4">
        <img alt="Close-up image of a white car side mirror and front window" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" height="64" src={item.thumbnail} width="64" />
        <h2 className="font-semibold text-lg leading-6">
          {item.name}
        </h2>
      </div>
      <div className="flex bg-[#383A4B] rounded-lg p-3 mb-6 items-center justify-between">
        <div className="flex items-center space-x-2 text-[#6B6F8C] font-semibold text-sm">
          <i className="fas fa-money-bill-wave text-[#6B6F8C]">
          </i>
          <span>
            Total Cost
          </span>
        </div>
        <div className="font-bold text-white text-lg">
          ${item.price}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-white text-sm">
        <div>
          <div className="text-[#6B6F8C] font-semibold mb-1">
            Service
          </div>
          <div>
            {item?.services?.join(', ') || 'No services'}
          </div>
        </div>
        <div>
          <div className="text-[#6B6F8C] font-semibold mb-1">
            Option
          </div>
          <div>
            Carbon Film
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-[#6B6F8C] font-semibold mb-1">
            Technician Assigned
          </div>
          <select aria-label="Select Technician Assigned" className="bg-[#383A4B] rounded-md text-[#6B6F8C] px-3 py-2 w-full cursor-pointer">
            <option>
              Select
            </option>
          </select>
        </div>
        <div className="col-span-2">
          <div className="text-[#6B6F8C] font-semibold mb-1">
            Start Date
          </div>
          <select aria-label="Select Start Date" className="bg-[#383A4B] rounded-md text-[#6B6F8C] px-3 py-2 w-full cursor-pointer">
            <option>
              Select
            </option>
          </select>
        </div>
        <div className="col-span-2 flex items-center space-x-2">
          <div>
            <div className="text-[#6B6F8C] font-semibold mb-1">
              Start Time
            </div>
            {(() => {
              const hours = Math.floor((item.duration || 0) / 60);
              const mins = (item.duration || 0) % 60;
              return (
                <div className="flex items-center gap-2">
                  <input
                    className="w-8 bg-[#2a2a3d] text-white rounded-md px-1 py-1 border border-[#3f3f46] text-center focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    value={hours}
                    readOnly
                  />
                  <span>hours</span>
                  <input
                    className="w-10  bg-[#2a2a3d] text-white rounded-md px-1 py-1 border border-[#3f3f46] text-center focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    value={mins}
                    readOnly
                  />
                  <span>mins</span>
                </div>
              );
            })()}
          </div>
        </div>
        <div className="col-span-2 mt-3">
          <div className="bg-[#383A4B] rounded-md inline-block px-4 py-2 font-semibold text-white">
            Estimated End Time
            <span className="ml-2">
              --
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard;
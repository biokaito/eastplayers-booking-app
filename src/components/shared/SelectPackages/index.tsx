import { Package } from "@/models/package.model";
import { Button, Spin } from "antd";
import clsx from "clsx";
import { Plus, Search, Trash, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface ISelectPackagesProps {
  onSelectPackages: (pkgs: Package[]) => void;
  loading?: boolean;
  packages?: Package[];
  close: () => void;
}

const SelectPackages: FC<ISelectPackagesProps> = ({ onSelectPackages, close, packages, loading }) => {
  const [rawPackages, setRawPackages] = useState<Package[]>(packages || []);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(packages || []);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = rawPackages.filter(pkg =>
        pkg.name.toLowerCase().includes(term) ||
        (pkg.description?.toLowerCase().includes(term) ?? false)
      );
      setFilteredPackages(filtered);
    } else {
      setFilteredPackages(rawPackages);
    }
  }

  const handleRowClick = (pkg: Package) => {
    const isSelected = selectedRowKeys.includes(pkg?.id);
    if (isSelected) {
      setSelectedRowKeys(selectedRowKeys.filter(key => key !== pkg.id));
    } else {
      setSelectedRowKeys([...selectedRowKeys, pkg.id]);
    }
  }

  const handleSelectPackage = () => {
    const selectedPackages = filteredPackages.filter(pkg => selectedRowKeys.includes(pkg.id));
    if (selectedPackages?.length) {
      onSelectPackages([...selectedPackages]);
      close();
    }
  }

  useEffect(() => {
    if (packages?.length) {
      setRawPackages([...packages]);
      setFilteredPackages([...packages]);
    }
  }, [packages]);

  return <div className="w-full bg-[#1e2028] flex flex-col h-full">
    <div className="flex justify-between items-center px-5 py-3 border-b border-[#2a2c36]">
      <h2 className="text-white font-semibold text-base">Packages</h2>
      <Button type="text" onClick={close} icon={<X className="text-white text-xl leading-none hover:text-gray-400" color="white" />} />
    </div>
    <div className="px-5 py-3">
      <div className="relative grid grid-cols-1">
        <input
          onChange={handlerSearch}
          type="text"
          placeholder="Search by name or description"
          className="w-full bg-[#2a2c36] rounded-md py-2 pl-10 pr-12  text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 ">
          <Search className="w-5 h-5" />
        </span>
      </div>
    </div>
    <div className="px-5">
      <div className="overflow-x-auto scrollbar-thin max-h-[50rem] border border-[#3f3f46] rounded-md">
        <table className="min-w-full border-collapse table-fixed text-left text-xs">
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
            {!loading && filteredPackages.map((pkg, index) => (
              <tr className={clsx("border-t border-[#3f3f46] cursor-pointer", selectedRowKeys.includes(pkg.id) ? "bg-[#16407a]" : 'bg-[#1e2028]')} onClick={() => handleRowClick(pkg)} key={index}>
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
                  <input type="checkbox" checked={selectedRowKeys.includes(pkg.id)} className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        disabled={!selectedRowKeys.length}
        onClick={handleSelectPackage}
        className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 transition text-white"
      >
        Select {selectedRowKeys.length > 0 ? `(${selectedRowKeys.length})` : ''}
      </Button>
    </div>
  </div >
}

export default SelectPackages;
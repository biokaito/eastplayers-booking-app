"use client";

import { useUserStore } from "@/providers/common.store.provider";
import { Image } from "antd";
import clsx from 'clsx'
import { useEffect, useState } from "react";

const navItems = [
  { icon: "/icons/proposals-icon.svg", label: "Proposals", href: "/proposals" },
  { icon: "/icons/services-icon.svg", label: "Services", href: "/services" },
  { icon: "/icons/vehicle-rules-icon.svg", label: "Vehicle Rules", href: "/vehicle-rules" },
  { icon: "/icons/appointments-icon.svg", label: "Appointments", href: "/appointments" },
  { icon: "/icons/inventory-icon.svg", label: "Inventory", href: "/inventory" },
  { icon: "/icons/contacts-icon.svg", label: "Contacts", href: "/contacts" },
  { icon: "/icons/transactions-icon.svg", label: "Transactions", href: "/transactions" },
  { icon: "/icons/invoices-icon.svg", label: "Invoices", href: "/invoices" }
]

const Navbar = () => {
  const { user } = useUserStore((state) => state)

  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
      console.log("Active Path: ", window.location.pathname);
    }
  }, []);

  return (
    <aside className="w-56 bg-[#121212] flex flex-col justify-between h-full absolute left-0 top-0 z-10 border-r border-[#222222]">
      <div>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#222222] h-20">
          <Image preview={false} src={"/images/cencaltinting-logo.png"} width={300} />
        </div>
        <nav className="mt-4 flex flex-col gap-2 text-sm font-normal text-white/80">
          {
            navItems.map((item, index) => (
              <a key={index} className={clsx("flex font-medium items-center gap-3 hover:text-white transition-colors px-4 py-2", activePath.includes(item.href) && "text-[#2E7FF1] border-r border-r-4 border-[#2E7FF1]")} href={item.href}>
                <img alt={item.label} className="w-5 h-5" src={item.icon} />
                {item.label}
              </a>
            ))
          }
        </nav>
      </div>
      <div className="flex items-center gap-2 px-4 py-3 border-t border-[#222222] cursor-pointer select-none">
        <Image preview={false} alt="User profile picture, cartoon style face with light skin and beard" className="w-6 h-6 rounded-full" src={user.avatar} width={40} />
        <span className="text-xs font-semibold text-white">
          {user.name}
        </span>
      </div>
    </aside>
  )
}

export default Navbar;
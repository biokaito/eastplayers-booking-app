"use client";

import { RouteNames } from "@/constant/config";
import { Button } from "antd";
import { AlignLeft, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      console.log("Current Path: ", window.location.pathname);
    }
  }, [])

  return (
    <header className=" flex items-center bg-[#121212] px-6 py-3 border-b border-[#222222] absolute top-0 left-0 right-0 h-20 pl-56">
      <div className="flex items-center gap-2 pl-4">
        {currentPath !== '/' && <MoveLeft color="white" />}
        <h1 className="text-white font-semibold text-base select-none">
          {RouteNames[currentPath as keyof typeof RouteNames] || "Dashboard"}
        </h1>
      </div>
    </header>
  )
}

export default Header;
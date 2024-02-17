import React, { useContext, useEffect, useState } from "react";
import { Search } from "./Search";
import useAuthStore from "@/store/jwt-token";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Router from "next/router";
import { AuthContext } from "@/lib/AuthProvider";
export const Navbar: React.FC = ({ }) => {
  const { user, logout } = useContext(AuthContext)
  const router = Router;
  const [name, setName] = useState("");
  const handleLogout = async () => {
    await logout();
    router.replace("/login")
  }
  useEffect(() => {
    if (user) {
      setName(
        ", " +
        user?.firstName.charAt(0).toUpperCase() +
        user?.firstName.substring(1),
      );
    }
  }, [user]);
  return (
    <div
      className="flex 
        h-20 
        flex-1
        items-center  
        justify-between 
        border-b-2 p-4"
    >
      <div className="font-mono text-2xl font-bold text-primary">
        Batish Money Manager
      </div>
      <div className=" flex font-mono text-2xl font-bold text-primary">
        {name}
      </div>
      <Search />
      <div className="flex pl-4">
        <Button variant="outline" size="icon">
          <LogOutIcon onClick={handleLogout} />
        </Button>
      </div>
    </div>
  );
};

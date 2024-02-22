import { Button } from "@/components/ui/button";
import { AuthContext } from "@/lib/AuthProvider";
import { LogOutIcon } from "lucide-react";
import Router from "next/router";
import React, { useContext } from "react";
import { Search } from "./Search";

export const Navbar: React.FC = ({}) => {
  const { logout } = useContext(AuthContext);
  const router = Router;
  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div
      className="flex 
        h-20 
        flex-1
        items-center  
        justify-between 
        border-b-2 p-4"
    >
      <div className=" font-roboto-slab text-4xl font-bold text-primary">
        Batish Money Manager
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

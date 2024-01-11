import React from "react";
import { Search } from "./Search";
export const Navbar: React.FC = ({ }) => {
  return (
    <div
      className="flex 
        h-20 
        flex-1
        items-center  
        justify-between 
        p-4 border-b-2"
    >
      <div className="text-primary font-bold font-mono text-2xl">
        Batish Money Manager
      </div>
      <Search />

    </div>
  );
};

import React from "react";
import { Search } from "./Search";
export const Navbar: React.FC = ({}) => {
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
      <Search />
    </div>
  );
};

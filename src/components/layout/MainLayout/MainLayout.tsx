import React from "react";
import { AddBills } from "./AddBills/AddBills";
import { Goals } from "./Goals";
import { Home } from "./Home/Home";
import { MonthlySpending } from "./MonthlySpending";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useMainContent } from "@/store/main-content";
import { useRouter } from "next/router";
import { TSection } from "@/lib/Interfaces";

interface MainLayout {
  data: any;
}

export const MainLayout: React.FC<MainLayout> = ({ data }) => {
  const { collapsed } = useSidebar((state) => state);
  const router = useRouter();
  const { section } = router.query;
  return (
    <div className={cn("ml-72 flex flex-col", collapsed && "ml-16")}>
      <div
        className={cn(
          "hidden",
          (section as String as TSection) === "home" && "block",
        )}
      >
        {data && (
          <Home
            parsedData={data?.data?.parsedData}
            catData={data?.data?.catData}
            tatti={""}
          />
        )}
      </div>
      <div
        className={cn(
          "hidden",
          (section as String as TSection) === "add-bills" && "block",
        )}
      >
        <AddBills />
      </div>
      <div
        className={cn(
          "hidden",
          (section as String as TSection) === "goals" && "block",
        )}
      >
        <Goals />
      </div>
      <div
        className={cn(
          "hidden",
          (section as String as TSection) === "monthly-spending" && "block",
        )}
      >
        <MonthlySpending />
      </div>
    </div>
  );
};

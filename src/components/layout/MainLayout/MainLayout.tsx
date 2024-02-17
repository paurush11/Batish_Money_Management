import { IExpenseData, TSection } from "@/lib/Interfaces";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useRouter } from "next/router";
import React from "react";
import { AddBills } from "./AddBills/AddBills";
import { Goals } from "./Goals";
import { MonthlySpending } from "./MonthlySpending";

interface MainLayout {
  UserExpensesData: IExpenseData[];
}

export const MainLayout: React.FC<MainLayout> = ({ UserExpensesData }) => {
  const { collapsed } = useSidebar((state) => state);
  const router = useRouter();
  const { section } = router.query;
  console.log(UserExpensesData);

  return (
    <div className={cn("ml-72 flex flex-col", collapsed && "ml-16")}>
      <div
        className={cn(
          "hidden",
          (section as String as TSection) === "home" && "block",
        )}
      >
        {/* {data && (
          <Home
            parsedData={data?.data?.parsedData}
            catData={data?.data?.catData}
            tatti={""}
          />
        )} */}
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

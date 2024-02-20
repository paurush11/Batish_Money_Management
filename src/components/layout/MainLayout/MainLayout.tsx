import { ICatData, IExpenseData, TSection } from "@/lib/Interfaces";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useRouter } from "next/router";
import React from "react";
import { AddBills } from "./AddBills/AddBills";
import { Goals } from "./Goals";
import { MonthlySpending } from "./MonthlySpending";
import { Home } from "./Home/Home";

interface MainLayout {
  UserExpensesData: IExpenseData[];
}

export const MainLayout: React.FC<MainLayout> = ({ UserExpensesData }) => {
  const { collapsed } = useSidebar((state) => state);
  const router = useRouter();
  const { section } = router.query;
  let catData: ICatData[] = [];
  const totalByCategory = UserExpensesData.reduce(
    (acc: { [key: string]: number }, item) => {
      var value = (acc[item.category] || 0) + item.amount;
      acc[item.category] = parseFloat(value.toFixed(2));
      return acc;
    },
    {},
  );
  Object.entries(totalByCategory).forEach(([value, amt]) => {
    catData.push({
      name: value.toUpperCase(),
      amount: amt,
    });
  });
  catData.sort((a, b) => b.amount - a.amount);
  return (
    <div className={cn("ml-72 flex flex-col", collapsed && "ml-16")}>
      <div
        className={cn(
          "hidden",
          (section as String as TSection) === "home" && "block",
        )}
      >
        {UserExpensesData && (
          <Home parsedData={UserExpensesData} catData={catData} />
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

import ExpensesTable from "@/components/layout/ExpensesList";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { IUser, searchProps } from "@/lib/Interfaces";
import {
  cn,
  getExpenses,
  getUser,
  getUserExpenses,
  isAmount,
  isCategory,
  isDate,
  isFrequency,
  isPaymentMethod,
  isPaymentStatus,
} from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";

const search: React.FC<searchProps> = ({
  searchedExpenses,
  userData,
  AllUserExpenses,
}) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <div className="flex w-full flex-col">
      <Navbar />
      <Sidebar userData={userData} />
      <div className={cn("ml-72 flex flex-col", collapsed && "ml-16")}>
        {searchedExpenses && <ExpensesTable expenses={searchedExpenses} />}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term } = context.query;
  const cookies = parseCookies(context);
  const authToken = cookies.authToken;
  const userName = cookies.userName;
  let userData: IUser = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    userName: "",
    role: "USER",
  };

  const user = await getUser(userName as string, authToken as string);
  if (user.data) {
    userData = user.data;
  }
  const allExpenses = await getUserExpenses(userData.id, authToken as string);

  let url = "";
  if (!term) {
    return {
      props: {
        userData,
      },
    };
  }
  const delimiters = /[, ]+/;
  const terms = (term as string).split(delimiters);
  terms.forEach((item) => {
    if (item === "other") {
      url += `category=${item}&`;
      url += `paymentMethod=${item}&`;
    } else if (isDate(item)) {
      url += `dueDate=${item}&`;
    } else if (isAmount(item)) {
      url += `amount=${item}&`;
    } else if (isFrequency(item)) {
      url += `frequency=${item}&`;
    } else if (isPaymentMethod(item)) {
      url += `paymentMethod=${item}&`;
    } else if (isPaymentStatus(item)) {
      url += `paymentStatus=${item}&`;
    } else if (isCategory(item)) {
      url += `category=${item}&`;
    } else if (item === "true" || item === "false") {
      url += `reminders=${item}&`;
      url += `automaticBillDetection=${item}&`;
      url += `alertsForPriceChanges=${item}&`;
    }
  });
  url = url.slice(0, url.length - 1);
  if (url.length === 0) {
    return {
      props: {
        url,
        expenses: [],
      },
    };
  }
  const expense = await getExpenses(url, authToken as string);

  return {
    props: {
      url,
      searchedExpenses: expense.data,
      AllUserExpenses: allExpenses,
      userData,
    },
  };
};

export default search;

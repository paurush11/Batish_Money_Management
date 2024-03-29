import { MainLayout } from "@/components/layout/MainLayout/MainLayout";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { IExpenseData, IUser, TSection } from "@/lib/Interfaces";
import { getServerSidePropsForSection } from "@/lib/dataFetching";
import { GetServerSideProps } from "next";
import React from "react";
import { parseCookies } from "nookies";
import axios, { AxiosError } from "axios";
import {
  GET_ALL_USER_EXPENSES,
  GET_USER_BY_USERNAME,
} from "@/server/REST_API_Const";
import { getUser, getUserExpenses } from "@/lib/utils";

interface SectionPageProps {
  data: any;
  userData: IUser;
  UserExpensesData: IExpenseData[];
}

const SectionPage: React.FC<SectionPageProps> = ({
  data,
  userData,
  UserExpensesData,
}) => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <Sidebar userData={userData} />
      <MainLayout UserExpensesData={UserExpensesData} userData={userData} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  const cookies = parseCookies(context);
  const authToken = cookies.authToken;
  const userName = cookies.userName;
  let UserExpensesData: IExpenseData[] = [];
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
  try {
    const user = await getUser(userName as string, authToken as string);
    const data = await getServerSidePropsForSection(
      params?.section as String as TSection,
    );
    if (user.data) {
      userData = user.data;
    }
    const expense = await getUserExpenses(userData.id, authToken as string);
    if (expense.data) {
      UserExpensesData = expense.data;
    }
    return {
      props: {
        data: data,
        userData,
        UserExpensesData,
      },
    };
  } catch (e: any) {
    console.error(e);
    // Redirect to login or an error page if an error occurs
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default SectionPage;

import { MainLayout } from "@/components/layout/MainLayout/MainLayout";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { TSection } from "@/lib/Interfaces";
import { getServerSidePropsForSection } from "@/lib/dataFetching";
import { GetServerSideProps } from "next";
import React from "react";

interface SectionPageProps {
  data: any;
}

const SectionPage: React.FC<SectionPageProps> = ({ data }) => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <Sidebar />
      <MainLayout data={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  const data = await getServerSidePropsForSection(
    params?.section as String as TSection,
  );

  return { props: { data } };
};

export default SectionPage;

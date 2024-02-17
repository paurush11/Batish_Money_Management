import { parseCookies } from "nookies";
// import { Get_Home_Data_URL, dummyUrl } from "@/server/REST_API_Const";
import { ICatData, IHomeData, IParsedData, IUser } from "@/lib/Interfaces";
import { GetServerSideProps } from "next";
import React from "react";
import { Activity } from "./Activity";
import { Balance } from "./Balance";
import { TopSummary } from "./TopSummary";

export const Home: React.FC<IHomeData> = ({ parsedData, catData }) => {
  return (
    <div className="flex flex-col">
      <div className="flex ">
        {" "}
        {/*row */}
        <div className="flex h-[92vh] w-[60vw] border-b-2 border-r-2 p-8">
          <Activity parsedData={parsedData} catData={catData} />
        </div>
        <div className="flex h-[92vh] flex-1 border-b-2 p-8">
          <TopSummary catData={catData} parsedData={parsedData} />
          <Balance />
        </div>
      </div>
    </div>
  );
};

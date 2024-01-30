import { data } from "@/data";
import { Get_Home_Data_URL, dummyUrl } from "@/server/REST_API_Const";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { Activity } from "./Activity";
import { Balance } from "./Balance";
import { ICatData, IHomeData, IParsedData } from "@/lib/Interfaces";
import { TopSummary } from "./TopSummary";

export const Home: React.FC<IHomeData> = ({ parsedData, catData, tatti }) => {
  parsedData;
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

export const getServerSideProps: GetServerSideProps = async () => {
  let parsedData: IParsedData[] = [];
  let catData: ICatData[] = [];
  let tatti = "";
  try {
    const response = await axios.get(Get_Home_Data_URL);
    const response2 = await axios.get(dummyUrl);

    if (response2.data && response2.data.message) {
      tatti = response2.data.message;
      console.log("hi" + response2.data);
    } else {
      console.log("Message property not found in response:", response2.data);
    }
    // response.data
    parsedData = data;
    //   .map((d) => {
    //     const correctDate = new Date(d.dueDate);
    //     return { ...d, dueDate: correctDate.toLocaleDateString() };
    //   })
    //   .filter((d, index) => index < 10);
    // const totalByCategory = parsedData.reduce(
    //   (acc: { [key: string]: number }, item) => {
    //     var value = (acc[item.category] || 0) + item.amount;
    //     acc[item.category] = parseFloat(value.toFixed(2));
    //     return acc;
    //   },
    //   {},
    // );
    // Object.entries(totalByCategory).forEach(([value, amt]) => {
    //   catData.push({
    //     name: value.toUpperCase(),
    //     amount: amt,
    //   });
    // });
    // catData.sort((a, b) => b.amount - a.amount);
  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      tatti,
      parsedData,
      catData,
    },
  };
};

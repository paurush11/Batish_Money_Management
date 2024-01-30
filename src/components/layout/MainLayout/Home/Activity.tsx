import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IActivity } from "../../../../lib/Interfaces";

export const Activity: React.FC<IActivity> = ({ parsedData, catData }) => {
  return (
    <div className="flex h-[85vh] w-[56vw] flex-1 flex-col  space-y-3">
      <div className="text-3xl">Money Insight</div>
      <div className="flex h-full flex-col pt-8">
        <div className="mb-3 flex space-x-4">
          {catData?.map((d) => (
            <div
              key={d.name}
              className="h-30 flex w-60 flex-col  rounded-lg  border-2 p-2 hover:bg-slate-600 "
            >
              <div className="flex pl-3 text-lg font-bold text-primary">
                {d.name[0]?.toUpperCase() +
                  d.name.substring(1).toLocaleLowerCase()}
              </div>
              <div className="flex p-3 text-3xl text-muted-foreground  hover:text-white">
                ${d.amount}
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-full rounded-lg border-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={parsedData}>
              <XAxis
                dataKey="dueDate"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey={"amount"}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />

              <Tooltip />
              <Legend />
              <Bar
                dataKey="amount"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export interface IParsedData {
    dueDate: string;
    name: string;
    amount: number;
    frequency: string;
    category: string;
    paymentStatus: string;
    paymentMethod: string;
    reminders: boolean;
    notes: string;
    automaticBillDetection: boolean;
    alertsForPriceChanges: boolean;
    customizableView: string;
}
export type parsedDataType = IParsedData[]
export interface IActivity {
    parsedData: parsedDataType
    catData: {
        name: string;
        amount: number;
    }[]
}
export const Activity: React.FC<IActivity> = ({ parsedData, catData }) => {

    return (
        <div className="flex flex-col flex-1 space-y-3 h-[85vh]  w-[56vw]">
            <div className="text-3xl">
                Money Insight
            </div>
            <div className="flex flex-col pt-8 h-full">
                <div className="flex mb-3 space-x-4">
                    {catData.map(d => (
                        <div className='flex flex-col p-2 h-30  w-60  border-2 rounded-lg hover:bg-slate-600 '>
                            <div className="flex text-primary text-lg pl-3 font-bold">
                                {d.name[0]?.toUpperCase() + d.name.substring(1).toLocaleLowerCase()}
                            </div>
                            <div className="flex text-muted-foreground p-3 text-3xl  hover:text-white">
                                ${d.amount}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex border-2 rounded-lg h-full">

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
}
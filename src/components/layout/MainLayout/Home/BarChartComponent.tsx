import React from 'react'
import { Bar, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart } from 'recharts';
import { parsedDataType } from './Activity';

export interface IBarChartProps {
    parsedData: parsedDataType
}

export const BarChartComponent: React.FC<IBarChartProps> = ({ parsedData }) => {
    return (

        <div className="flex pt-8 border-red-50 border-2 rounded-lg h-full ">
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
    );
}
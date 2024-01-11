import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { data } from '@/data';
import { Cell, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useSidebar } from '@/store/use-sidebar';
import { parsedDataType } from './Activity';


export interface ITopSummary {
    parsedData: parsedDataType
    catData: {
        name: string;
        amount: number;
    }[]
}
export const TopSummary: React.FC<ITopSummary> = ({ catData }) => {


    const {
        collapsed,
    } = useSidebar((state) => state);

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className="flex items-center justify-center flex-1">
            <Card className='flex flex-col flex-1 h-full'>
                <CardHeader>
                    <CardTitle>Top Summary</CardTitle>
                    <CardDescription>Indicates your expenses</CardDescription>
                </CardHeader>
                <CardContent className='flex h-full w-full' >
                    <ResponsiveContainer width="100%" height="100%" minWidth={"100%"} minHeight={"100%"} >
                        {!collapsed ?
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={catData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="amount"

                                >
                                    <Tooltip />
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart> : <RadarChart cx="55%" cy="50%" outerRadius="80%" data={catData}>
                                <PolarGrid />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                <PolarAngleAxis dataKey="name" />
                                <Tooltip />
                                <PolarRadiusAxis />
                                <Radar name="Money Spent" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>}

                    </ResponsiveContainer>

                </CardContent>
                <CardFooter>
                    <p>Analyze your top expenses to make sure to understand where your money goes </p>
                </CardFooter>
            </Card>
        </div>
    );
}
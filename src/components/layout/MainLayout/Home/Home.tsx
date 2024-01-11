import React from 'react'
import { TopSummary } from './TopSummary';
import { Balance } from './Balance';
import { Activity } from './Activity';
import { data } from '@/data';


export const Home: React.FC = ({ }) => {
    const parsedData = data.map((d) => {
        const correctDate = new Date(d.dueDate)
        return { ...d, dueDate: correctDate.toLocaleDateString() }
    }).filter((d, index) => index < 10)
    const totalByCategory = parsedData.reduce((acc: { [key: string]: number }, item) => {
        var value = (acc[item.category] || 0) + item.amount
        acc[item.category] = parseFloat(value.toFixed(2))
        return acc
    }, {})
    const catData: { name: string, amount: number }[] = []
    Object.entries(totalByCategory).forEach(([value, amt]) => {
        catData.push({
            name: value.toUpperCase(),
            amount: amt
        })
    })
    catData.sort((a, b) => b.amount - a.amount)
    return (
        <div className="flex flex-col">
            <div className="flex ">  {/*row */}
                <div className="flex w-[60vw] h-[92vh] border-r-2 p-8 border-b-2">
                    <Activity parsedData={parsedData} catData={catData} />
                </div>
                <div className="flex p-8 flex-1 h-[92vh] border-b-2">
                    <TopSummary catData={catData} parsedData={parsedData} />
                    <Balance />
                </div>
            </div>
        </div>
    );
}
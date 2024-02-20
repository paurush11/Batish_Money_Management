import ExpensesTable from '@/components/layout/ExpensesList';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { searchProps } from '@/lib/Interfaces';
import { cn, getExpenses, isAmount, isCategory, isDate, isFrequency, isPaymentMethod, isPaymentStatus } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';


const search: React.FC<searchProps> = ({ expenses }) => {
    const { collapsed } = useSidebar((state) => state);
    return (
        <div className="flex flex-col w-full">
            <Navbar />
            <Sidebar />
            <div className={cn("ml-72 flex flex-col", collapsed && "ml-16")}>
                {
                    // expenses.map(e => {
                    //     return (
                    //         <div className='flex space-x-4 border-b-2  justify-between align-middle'>
                    //             <div className="flex  w-full border-r-2 p-2">
                    //                 {e.name}
                    //             </div>
                    //             <div className="flex   w-full border-r-2 p-2">
                    //                 {e.amount}
                    //             </div>
                    //             <div className="flex   w-full border-r-2 p-2">
                    //                 {e.category}
                    //             </div>
                    //             <div className="flex   w-full border-r-2 p-2">
                    //                 {e.paymentMethod}
                    //             </div>
                    //             <div className="flex   w-full border-r-2 p-2">
                    //                 {e.frequency}
                    //             </div>
                    //             <div className="flex   w-full border-r-2 p-2">
                    //                 {e.paymentStatus}
                    //             </div>
                    //             <div className="flex   w-full border-r-2 p-2">
                    //                 {e.dueDate}
                    //             </div>


                    //         </div>

                    //     )
                    // })
                    <ExpensesTable expenses={expenses} />
                }
            </div>
        </div>
    );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { term } = context.query;
    const cookies = parseCookies(context);
    const authToken = cookies.authToken;
    if (!term) {
        return {
            props: {

            },
        };
    }
    let url = "";
    const delimiters = /[, ]+/;
    const terms = (term as string).split(delimiters);
    terms.forEach(item => {
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
    })
    url = url.slice(0, url.length - 1);
    if (url.length === 0) {
        return {
            props: {
                url,
                expenses: []
            },
        };
    }
    const expense = await getExpenses(url, authToken as string);

    return {
        props: {
            url,
            expenses: expense.data
        },
    };
}

export default search
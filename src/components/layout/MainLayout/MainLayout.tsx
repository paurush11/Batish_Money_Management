import React from 'react'
import { AddBills } from './AddBills/AddBills';
import { Goals } from './Goals';
import { Home } from './Home/Home';
import { MonthlySpending } from './MonthlySpending';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { useMainContent } from '@/store/main-content';


export const MainLayout: React.FC = ({ }) => {
    const {
        collapsed,
    } = useSidebar((state) => state);
    const { value } = useMainContent((state) => state);
    return (
        <div className={cn("flex ml-72 flex-col", collapsed && "ml-16")}>
            <div className={cn("hidden", value === 0 && "block")}>
                <Home />
            </div>
            <div className={cn("hidden", value === 1 && "block")}>
                <AddBills />
            </div>
            <div className={cn("hidden", value === 2 && "block")}>
                <Goals />
            </div>
            <div className={cn("hidden", value === 3 && "block")}>
                <MonthlySpending />
            </div>
        </div>
    );
}
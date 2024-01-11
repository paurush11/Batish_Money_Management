import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";
import { Toggle } from "./Toggle";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { DollarSignIcon, GoalIcon, HomeIcon, PlusCircleIcon } from "lucide-react";
import { useMainContent } from "@/store/main-content";
import { Avatar } from "@/components/ui/avatar";

interface SidebarProps { }

export const Sidebar: React.FC<SidebarProps> = ({ }) => {
    const {
        collapsed,
    } = useSidebar((state) => state);
    const { value, setValue } = useMainContent((state) => state);
    return (
        <aside className={cn(
            "fixed flex h-full flex-1 flex-col mt-[4.5rem] border-r-2 w-72",
            collapsed && "w-16"
        )}>
            <Toggle />
            <div className={cn("p-2 justify-center items-center w-full flex", collapsed && "hidden")}>
                <Image
                    className="rounded-full m-12"
                    src="https://media.licdn.com/dms/image/D4E03AQE70fdbpQu36A/profile-displayphoto-shrink_200_200/0/1687459709962?e=1709769600&v=beta&t=5ckTN0hi8U7VVsC0n7vzt-h88Npju6vcmDMhkbHGoq4"
                    alt="Pedro Duarte" width={"150"} height={"150"} />
            </div>

            <div className={cn("flex flex-col justify-center space-y-10  p-5", collapsed && "hidden")} >
                <Button variant={"ghost"} className="text-xl subpixel-antialiased  hover:antialiased font-semibold normal-case font-mono hover:text-2xl" onClick={() => setValue(0)}>Home</Button>
                <Button variant={"ghost"} className="text-xl subpixel-antialiased  hover:antialiased font-semibold normal-case font-mono hover:text-2xl" onClick={() => setValue(1)}>Add Bills</Button>
                <Button variant={"ghost"} className="text-xl subpixel-antialiased  hover:antialiased font-semibold normal-case font-mono hover:text-2xl" onClick={() => setValue(2)}>Goals</Button>
                <Button variant={"ghost"} className="text-xl subpixel-antialiased  hover:antialiased font-semibold normal-case font-mono hover:text-2xl" onClick={() => setValue(3)}>Monthly Spending</Button>
            </div>
            <div className={cn("flex flex-col items-center justify-center space-y-5", !collapsed && "hidden")}>
                <Button variant={"ghost"} className=" hover:bg-transparent" onClick={() => setValue(0)}>
                    <HomeIcon className="hover:w-10 hover:h-10" />
                </Button>
                <Button variant={"ghost"} className=" hover:bg-transparent" onClick={() => setValue(1)}>
                    <PlusCircleIcon className="hover:w-10 hover:h-10" />
                </Button>
                <Button variant={"ghost"} className=" hover:bg-transparent" onClick={() => setValue(2)}>
                    <GoalIcon className="hover:w-10 hover:h-10" />
                </Button>
                <Button variant={"ghost"} className=" hover:bg-transparent" onClick={() => setValue(3)}>
                    <DollarSignIcon className="hover:w-10 hover:h-10" />
                </Button>
                <Avatar />
            </div>
        </aside>
    );
};

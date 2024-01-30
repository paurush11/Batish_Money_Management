import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";
import { Toggle } from "./Toggle";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import {
  DollarSignIcon,
  GoalIcon,
  HomeIcon,
  PlusCircleIcon,
} from "lucide-react";
import { useMainContent } from "@/store/main-content";
import { Avatar } from "@/components/ui/avatar";
import router from "next/router";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { collapsed } = useSidebar((state) => state);
  const { value, setValue } = useMainContent((state) => state);
  return (
    <aside
      className={cn(
        "fixed mt-[4.5rem] flex h-full w-72 flex-1 flex-col border-r-2",
        collapsed && "w-16",
      )}
    >
      <Toggle />
      <div
        className={cn(
          "flex w-full items-center justify-center p-2",
          collapsed && "hidden",
        )}
      >
        <Image
          className="m-12 rounded-full"
          src="https://media.licdn.com/dms/image/D4E03AQE70fdbpQu36A/profile-displayphoto-shrink_200_200/0/1687459709962?e=1709769600&v=beta&t=5ckTN0hi8U7VVsC0n7vzt-h88Npju6vcmDMhkbHGoq4"
          alt="Pedro Duarte"
          width={"150"}
          height={"150"}
        />
      </div>

      <div
        className={cn(
          "flex flex-col justify-center space-y-10  p-5",
          collapsed && "hidden",
        )}
      >
        <Button
          variant={"ghost"}
          className="font-mono text-xl  font-semibold normal-case subpixel-antialiased hover:text-2xl hover:antialiased"
          onClick={() => router.push("/home")}
        >
          Home
        </Button>
        <Button
          variant={"ghost"}
          className="font-mono text-xl  font-semibold normal-case subpixel-antialiased hover:text-2xl hover:antialiased"
          onClick={() => router.push("/add-bills")}
        >
          Add Bills
        </Button>
        <Button
          variant={"ghost"}
          className="font-mono text-xl  font-semibold normal-case subpixel-antialiased hover:text-2xl hover:antialiased"
          onClick={() => router.push("/goals")}
        >
          Goals
        </Button>
        <Button
          variant={"ghost"}
          className="font-mono text-xl  font-semibold normal-case subpixel-antialiased hover:text-2xl hover:antialiased"
          onClick={() => router.push("/monthly-spending")}
        >
          Monthly Spending
        </Button>
      </div>
      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-5",
          !collapsed && "hidden",
        )}
      >
        <Button
          variant={"ghost"}
          className=" hover:bg-transparent"
          onClick={() => router.push("/home")}
        >
          <HomeIcon className="hover:h-10 hover:w-10" />
        </Button>
        <Button
          variant={"ghost"}
          className=" hover:bg-transparent"
          onClick={() => router.push("/add-bills")}
        >
          <PlusCircleIcon className="hover:h-10 hover:w-10" />
        </Button>
        <Button
          variant={"ghost"}
          className=" hover:bg-transparent"
          onClick={() => router.push("/goals")}
        >
          <GoalIcon className="hover:h-10 hover:w-10" />
        </Button>
        <Button
          variant={"ghost"}
          className=" hover:bg-transparent"
          onClick={() => router.push("/monthly-spending")}
        >
          <DollarSignIcon className="hover:h-10 hover:w-10" />
        </Button>
        <Avatar />
      </div>
    </aside>
  );
};

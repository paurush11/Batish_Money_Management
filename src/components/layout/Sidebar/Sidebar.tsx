import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import {
  DollarSignIcon,
  GoalIcon,
  HomeIcon,
  PlusCircleIcon,
  Search,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import router from "next/router";
import React from "react";
import { Button } from "../../ui/button";
import { Toggle } from "./Toggle";
import { SidebarProps } from "@/lib/Interfaces";

export const Sidebar: React.FC<SidebarProps> = ({ userData }) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed mt-[4.5rem] flex h-full w-72 flex-1 flex-col border-r-2",
        collapsed && "w-16",
      )}
    >
      <Toggle
        name={
          userData?.firstName?.charAt(0).toUpperCase() +
            userData?.firstName?.substring(1).toLowerCase() || ""
        }
      />
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
        <div className="flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
          <HomeIcon className="" />
          <Button
            variant={"ghost"}
            className="font-roboto-slab text-xl font-medium subpixel-antialiased"
            onClick={() => router.push("/home")}
          >
            Home
          </Button>
        </div>
        <div className="flex items-center justify-center hover:bg-accent hover:text-2xl hover:text-accent-foreground hover:antialiased">
          <User2Icon className="" />
          <Button
            variant={"ghost"}
            className="font-roboto-slab text-xl font-medium subpixel-antialiased"
            onClick={() => router.push("/profile")}
          >
            Profile
          </Button>
        </div>
        <div className="flex items-center justify-center hover:bg-accent hover:text-2xl hover:text-accent-foreground hover:antialiased">
          <Search className="" />
          <Button
            variant={"ghost"}
            className="font-roboto-slab text-xl font-medium subpixel-antialiased "
            onClick={() => router.push("/search/")}
          >
            Search
          </Button>
        </div>

        <div className="flex items-center justify-center hover:bg-accent hover:text-2xl hover:text-accent-foreground hover:antialiased">
          <PlusCircleIcon className="" />
          <Button
            variant={"ghost"}
            className="font-roboto-slab text-xl font-medium subpixel-antialiased "
            onClick={() => router.push("/add-bills")}
          >
            Add Bills
          </Button>
        </div>
        <div className="flex items-center justify-center hover:bg-accent hover:text-2xl  hover:text-accent-foreground hover:antialiased">
          <GoalIcon className="" />
          <Button
            variant={"ghost"}
            className="font-roboto-slab text-xl font-medium subpixel-antialiased"
            onClick={() => router.push("/goals")}
          >
            Goals
          </Button>
        </div>
        <div className="flex items-center justify-center hover:bg-accent hover:text-2xl hover:text-accent-foreground hover:antialiased">
          <DollarSignIcon className="" />
          <Button
            variant={"ghost"}
            className="font-roboto-slab text-xl font-medium subpixel-antialiased"
            onClick={() => router.push("/monthly-spending")}
          >
            Monthly Spending
          </Button>
        </div>
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
          onClick={() => router.push("/profile")}
        >
          <User2Icon className="hover:h-10 hover:w-10" />
        </Button>
        <Button
          variant={"ghost"}
          className=" hover:bg-transparent"
          onClick={() => router.push("/search/")}
        >
          <Search className="hover:h-10 hover:w-10" />
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

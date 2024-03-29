import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";
import { Hint } from "./Hint";
type ToggleProps = {
  name: string;
};
export const Toggle: React.FC<ToggleProps> = ({ name }: ToggleProps) => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className=" font-roboto-slab text-2xl font-semibold text-primary">
            {name}
          </p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="ml-auto h-auto p-2"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

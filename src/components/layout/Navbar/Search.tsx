import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSearchX } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import qs from "query-string";

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("here");
    if (!value) return;
    console.log("here");

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true },
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };
  return (
    <div className="ml-auto flex ">
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Your Bills"
        className="w-[15vw]  
                rounded-r-none 
                focus-visible:ring-0 
                focus-visible:ring-transparent focus-visible:ring-offset-0
                "
      />
      <Button
        type="submit"
        variant={"ghost"}
        className="rounded-l-none bg-[#492636] text-white"
        onClick={(e) => {
          console.log("clicked");
          onSubmit(e);
        }}
      >
        <LucideSearchX />
      </Button>
    </div>
  );
};

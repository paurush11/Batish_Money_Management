import { AuthContext } from "@/lib/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { ILogin } from "@/lib/Interfaces";

type TLoginFormProps = {};

const formSchema = z.object({
  username: z.string().min(2, {
    message: "username must be atleast 2 characters",
  }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: "Password must be atleast 2 characters",
    })
    .max(20, {
      message: "Password must not be longer than 20 characters",
    }),
  // .regex(passwordRegex),
});
export const LoginForm: React.FC<TLoginFormProps> = ({}) => {
  const router = useRouter();
  const context = useContext(AuthContext);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const Password = (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem className="flex-col items-center justify-center pb-4">
          <div className="flex flex-col">
            <FormLabel className="w-72 text-lg font-extrabold text-foreground">
              Password
            </FormLabel>
          </div>
          <FormControl>
            {/* <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" /> */}
            <Input
              placeholder="LuSuarez2"
              {...field}
              type="password"
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
  const UserName = (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem className="flex-col items-center justify-center pb-4">
          <div className="flex flex-col">
            <FormLabel className="w-72 text-lg font-extrabold text-foreground">
              User Name
            </FormLabel>
          </div>
          <FormControl>
            <Input
              placeholder="LuSuarez2"
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const requiredValues: ILogin = {
      userName: values.username,
      password: values.password,
    };
    try {
      const res = await context?.login(requiredValues);

      if (res && res.message) {
        toast({
          title: "Error in Registering User",
          variant: "destructive",
          description: "User already Exists",
        });
        router.replace("/register");
        return;
      }
      console.log(context.user);
      console.log(context.token);
      toast({
        title: "New User Added",
        variant: "primary",
        description: `New User Named ${values.username} has been added Successfully`,
      });
      router.replace("/home");
      return;
    } catch (e: any) {
      toast({
        title: "Error in Registering User",
        variant: "destructive",
        description: `User Named ${values.username} could not login due to ${e.message}`,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
        className="flex flex-col pb-4"
      >
        {UserName}
        {Password}
        <div className="flex justify-center space-x-3">
          <Button variant={"ghost"} type="reset">
            Reset
          </Button>
          <Button variant={"default"} type="submit">
            Sign In
          </Button>
        </div>
        <p className="px-8 py-4 text-center text-sm text-muted-foreground">
          By clicking Create An Account, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </Form>
  );
};

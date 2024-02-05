"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
type TRegisterFormProps = {};
const passwordRegex = new RegExp("");
const phoneNumberFirstRegex = new RegExp("");
const phoneNumberLastRegex = new RegExp("");

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Name must be atleast 2 characters",
    }),
    lastName: z.string().min(2, {
        message: "Name must be atleast 2 characters",
    }),
    username: z.string().min(2, {
        message: "username must be atleast 2 characters",
    }),
    email: z.string().email({
        message: "Must be a valid email",
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
    phoneNumberFirst: z
        .string()
        .trim()
        .min(3, {
            message: "phoneNumber must be atleast 3 characters",
        })
        .max(3, {
            message: "phoneNumber must be atleast 3 characters",
        }),
    // .regex(phoneNumberFirstRegex),
    phoneNumberSecond: z
        .string()
        .trim()
        .min(3, {
            message: "phoneNumber must be atleast 3 characters",
        })
        .max(3, {
            message: "phoneNumber must be atleast 3 characters",
        }),
    // .regex(phoneNumberFirstRegex),
    phoneNumberLast: z
        .string()
        .trim()
        .min(4, {
            message: "phoneNumber must be atleast 4 characters",
        })
        .max(4, {
            message: "phoneNumber must be atleast 4 characters",
        }),
    // .regex(phoneNumberLastRegex)
});

export const RegisterForm: React.FC<TRegisterFormProps> = ({ }) => {
    const phoneNumberFirstRef = useRef<HTMLInputElement>(null);
    const phoneNumberSecondRef = useRef<HTMLInputElement>(null);
    const phoneNumberLastRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            phoneNumberFirst: "",
            phoneNumberSecond: "",
            phoneNumberLast: "",
        },
    });
    const distributePhoneNumber = (input: string) => {
        const sanitizedInput = input.replace(/\D/g, ""); // Remove non-digits
        const first = sanitizedInput.slice(0, 3);
        const second = sanitizedInput.slice(3, 6);
        const third = sanitizedInput.slice(6, 10);
        // Set the values in the form
        form.setValue("phoneNumberFirst", first);
        form.setValue("phoneNumberSecond", second);
        form.setValue("phoneNumberLast", third);

        // Manage focus
        if (third.length === 4) {
            phoneNumberLastRef.current?.focus();
        } else if (second.length === 3) {
            phoneNumberSecondRef.current?.focus();
        } else if (first.length === 3) {
            phoneNumberFirstRef.current?.focus();
        }
    };
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteContent = event.clipboardData.getData("text/plain");
        distributePhoneNumber(pasteContent);
    };
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("clicked");
        console.log(values);

        try {
            toast({
                title: "New User Added",
                variant: "primary",
                description: `New User Named ${values.username} has been added Successfully`,
            });
        } catch (e) {
            toast({
                title: "Error in Registering User",
                variant: "destructive",
                description: `New User Named ${values.username} has Not been added Successfully`,
            });
        }
    };
    const FirstName = (
        <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem className="flex-col items-center justify-center pb-4">
                    <div className="flex">
                        <FormLabel className="w-72 text-lg font-extrabold text-foreground">
                            First Name
                        </FormLabel>
                    </div>
                    <FormControl>
                        <Input
                            placeholder="Luis"
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
    const LastName = (
        <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem className="flex-col items-center justify-center pb-4">
                    <div className="flex flex-col">
                        <FormLabel className="w-72 text-lg font-extrabold text-foreground">
                            Last Name
                        </FormLabel>
                    </div>
                    <FormControl>
                        <Input
                            placeholder="Suarez"
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
    const Email = (
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className="flex-col items-center justify-center pb-4">
                    <div className="flex flex-col">
                        <FormLabel className="w-72 text-lg font-extrabold text-foreground">
                            Email
                        </FormLabel>
                    </div>
                    <FormControl>
                        <Input
                            placeholder="Luis@gmail.com"
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
    const PhoneNumber = (
        <FormField
            control={form.control}
            name="phoneNumberFirst"
            render={({ field }) => (
                <FormItem className="flex-col items-center justify-center pb-4">
                    <FormControl ref={phoneNumberFirstRef}>
                        <Input
                            maxLength={3}
                            placeholder="xxx"
                            {...field}
                            onChange={(e) => {
                                if (e.target.value && e.target.value.length === 3) {
                                    phoneNumberSecondRef.current?.focus();
                                    field.onChange(e.target.value.slice(0, 3));
                                } else {
                                    field.onChange(e.target.value);
                                }
                            }}
                            onPaste={handlePaste}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
    const PhoneNumberSecond = (
        <FormField
            control={form.control}
            name="phoneNumberSecond"
            render={({ field }) => (
                <FormItem className="flex-col items-center justify-center pb-4">
                    <FormControl ref={phoneNumberSecondRef}>
                        <Input
                            maxLength={3}
                            placeholder="xxx"
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                if (e.target.value && e.target.value.length === 3) {
                                    phoneNumberLastRef.current?.focus();
                                    field.onChange(e.target.value.slice(0, 3));
                                }
                            }}
                            onPaste={handlePaste}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
    const PhoneNumberLast = (
        <FormField
            control={form.control}
            name="phoneNumberLast"
            render={({ field }) => (
                <FormItem className="w-56 flex-col items-center justify-center pb-4">
                    <FormControl ref={phoneNumberLastRef}>
                        <Input
                            maxLength={4}
                            className="flex items-center justify-center"
                            placeholder="xxxx"
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                if (e.target.value && e.target.value.length > 4) {
                                    field.onChange(e.target.value.slice(0, 4));
                                }
                            }}
                            onPaste={handlePaste}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    // async function randi(errors:
    //     FieldErrors<{
    //         firstName: string;
    //         lastName: string;
    //         username: string; email: string; password: string; phoneNumberFirst: string; phoneNumberSecond: string; phoneNumberLast: string;
    //     }>, event?: BaseSyntheticEvent<object, any, any> | undefined) {
    //     const errorMessage = Object.values(errors).map(error => error?.message).join(", ");
    //     console.log(errorMessage)
    //     toast({
    //         title: "Error in Registering User",
    //         variant: "destructive",
    //         description: `Error: ${errorMessage}`,
    //     });
    //     // throw new Error("Function not implemented.");
    // }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={() => form.reset()}
                className="flex  flex-col"
            >
                <div className="flex justify-between">
                    {FirstName}
                    {LastName}
                </div>
                {UserName}
                {Email}
                {Password}
                <div className="flex flex-col pb-4">
                    <FormLabel className="w-72 text-lg font-extrabold text-foreground">
                        Phone Number
                    </FormLabel>
                </div>
                <div className="flex w-52 space-x-5">
                    {PhoneNumber}
                    {PhoneNumberSecond}
                    {PhoneNumberLast}
                </div>
                <div className="flex justify-center space-x-3">
                    <Button variant={"ghost"} type="reset">
                        Reset
                    </Button>
                    <Button variant={"default"} type="submit">
                        Create An Account
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

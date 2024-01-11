"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
const earliestDate = new Date('2000-01-01');
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }).max(50, {
        message: "Name cannot exceed 50 characters.",
    }),
    amount: z.number().min(0, {
        message: "Bill amount can't be negative"
    }).positive(),
    dueDate: z.date().refine(date => date > earliestDate && date < tomorrow, {
        message: "date cannot go before 2000 and after today"
    }),
    frequency: z.enum(["monthly", "quarterly", "annually"]),
    category: z.enum(["utilities", "rent", "insurance", "other"]),
    paymentStatus: z.enum(["paid", "unpaid", "partial"]),
    paymentMethod: z.enum(["credit card", "bank transfer", "cash", "other"]),
    reminders: z.boolean(),
    notes: z.string().optional(),
    attachments: z.array(z.string()).optional(), // assuming attachments are file paths or URLs
    automaticBillDetection: z.boolean(),
    alertsForPriceChanges: z.boolean(),
    customizableView: z.enum(["dueDate", "amount", "category", "custom"]).optional(),
})

type TAddBillsForm = {
    handleNameChange: (value: string) => void
    handleAmountChange: (value: string) => void
    handleDueDateChange: (value: string) => void
    handleFrequencyChange: (value: string) => void
    handleCategoryChange: (value: string) => void
    handlePaymentMethodChange: (value: string) => void
    handlePaymentStatusChange: (value: string) => void
    handleAttachmentChange: (value: string) => void
    handleNotesChange: (value: string) => void
}

export const AddBillsForm: React.FC<TAddBillsForm> = ({
    handleAmountChange,
    handleAttachmentChange,
    handleCategoryChange,
    handleDueDateChange,
    handleFrequencyChange,
    handleNameChange,
    handleNotesChange,
    handlePaymentMethodChange,
    handlePaymentStatusChange

}) => {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: 0,
            dueDate: today,
            frequency: "monthly",
            category: "utilities",
            paymentStatus: "paid",
            paymentMethod: "credit card",
            reminders: false,
            notes: "",
            automaticBillDetection: false,
            alertsForPriceChanges: false,
            customizableView: "custom"
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {

        try {
            console.log(values)
            toast({
                title: "New Bill Added",
                variant: "primary",
                description: `New Bill Named ${values.name} amounting to ${values.amount} has been added`,
            })
        } catch (e) {
            toast({
                title: "Error in Adding Bill",
                variant: "destructive",
                description: `New Bill Named ${values.name} amounting to ${values.amount} has Not been added Successfully`,
            })

        }

    }

    const Name = (
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className=" justify-center flex-col">
                    <div className="flex justify-center items-center border-b-2 pb-4">
                        <div className="flex flex-col">
                            <FormLabel className="text-foreground font-extrabold text-lg w-72">Bill Name</FormLabel>
                            <FormDescription>
                                This is your bill display name.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Input placeholder="Phone Bill December" {...field}
                                onChange={(e) => {
                                    handleNameChange(e.target.value)
                                    return field.onChange(e)
                                }}
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    const Amount = (
        <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem className=" justify-center flex-col pt-4">
                    <div className="flex justify-center items-center border-b-2 pb-4">
                        <div className="flex flex-col">
                            <FormLabel className="text-foreground font-extrabold text-lg w-72">Bill Amount</FormLabel>
                            <FormDescription>
                                Enter the amount.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Input placeholder="Phone Bill December" {...field}
                                onChange={(e) => {
                                    handleAmountChange(e.target.value)
                                    if (e.target.value)
                                        return field.onChange(parseFloat(e.target.value))
                                    else return field.onChange(0)
                                }} />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    const DueDate = (
        <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
                <FormItem className=" justify-center flex-col pt-4">
                    <div className="flex justify-center items-center border-b-2 pb-4">
                        <div className="flex flex-col">
                            <FormLabel className="text-foreground font-extrabold text-lg w-72">Bill Due Date</FormLabel>
                            <FormDescription>
                                This is your bill Due Date.
                            </FormDescription>
                        </div>
                        <div className="flex-1">

                            <FormControl >
                                <Popover>
                                    <PopoverTrigger asChild>

                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                onChange={(e) => {

                                                }}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>

                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(e) => {
                                                handleDueDateChange(e?.toDateString() || "")
                                                return field.onChange
                                            }
                                            }
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </div>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    const Frequency = (
        <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
                <FormItem className=" justify-center flex-col pt-4">
                    <div className="flex justify-center items-center border-b-2 pb-4">
                        <div className="flex flex-col">
                            <FormLabel className="text-foreground font-extrabold text-lg w-72">Frequency</FormLabel>
                            <FormDescription>
                                Choose the Frequency.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <RadioGroup onValueChange={(e) => {
                                handleFrequencyChange(e)
                                return field.onChange(e)
                            }} defaultValue={"monthly"} className="flex flex-col space-y-2 flex-1" >
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"monthly"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "monthly" && "text-foreground")}>Monthly</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"quarterly"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "quarterly" && "text-foreground")}>Quarterly</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"annually"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "annually" && "text-foreground")}>Annually</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    const Category = (
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem className=" justify-center flex-col pt-4">
                    <div className="flex justify-center items-center border-b-2 pb-4">
                        <div className="flex flex-col">
                            <FormLabel className="text-foreground font-extrabold text-lg w-72">Category</FormLabel>
                            <FormDescription>
                                Choose the Category.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <RadioGroup onValueChange={(e) => {
                                handleCategoryChange(e)
                                return field.onChange(e)
                            }} defaultValue={"utilities"} className="flex flex-col space-y-2 flex-1" >
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"utilities"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "utilities" && "text-foreground")}>Utilities</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"rent"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "rent" && "text-foreground")}>Rent</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"insurance"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "insurance" && "text-foreground")}>Insurance</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"other"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "other" && "text-foreground")}>Other</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    const PaymentStatus = (
        <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
                <FormItem className=" justify-center flex-col pt-4">
                    <div className="flex justify-center items-center border-b-2 pb-4">
                        <div className="flex flex-col">
                            <FormLabel className="text-foreground font-extrabold text-lg w-72">Payment Status</FormLabel>
                            <FormDescription>
                                Choose the Payment Status.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <RadioGroup onValueChange={(e) => {
                                handlePaymentStatusChange(e)
                                return field.onChange(e)
                            }} defaultValue={"paid"} className="flex flex-col space-y-2 flex-1" >
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"paid"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "paid" && "text-foreground")}>Paid</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"unpaid"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "unpaid" && "text-foreground")}>Unpaid</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"parital"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "partial" && "text-foreground")}>Parital</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
    const PaymentMethod = (
        <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
                <FormItem className=" justify-center flex-col pt-4">
                    <div className="flex justify-center items-center border-b-2 pb-4">
                        <div className="flex flex-col">
                            <FormLabel className="text-foreground font-extrabold text-lg w-72">Payment Method</FormLabel>
                            <FormDescription>
                                Choose the Payment Method.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <RadioGroup onValueChange={(e) => {
                                handlePaymentMethodChange(e)
                                return field.onChange(e)
                            }} defaultValue={"credit card"} className="flex flex-col space-y-2 flex-1" >
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"credit card"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "credit card" && "text-foreground")}>Credit card</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"bank transfer"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "bank transfer" && "text-foreground")}>Bank transfer</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"cash"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "cash" && "text-foreground")}>Cash</FormLabel>
                                </FormItem>
                                <FormItem className="items-center justify-start space-x-3 space-y-0 flex">
                                    <FormControl>
                                        <RadioGroupItem value={"other"} />
                                    </FormControl>
                                    <FormLabel className={cn("text-muted-foreground text-sm", field.value === "other" && "text-foreground")}>Other</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}
                onReset={() => {
                    handleNameChange("")
                    handleAmountChange("")
                    handleDueDateChange("")
                    handleFrequencyChange("")
                    handleCategoryChange("")
                    handlePaymentMethodChange("")
                    handlePaymentStatusChange("")
                    handleAttachmentChange("")
                    handleNotesChange("")
                    return form.reset()
                }
                } className="space-y-10 flex-1">
                <ScrollArea className=" h-[65vh]">
                    {Name}
                    {Amount}
                    {DueDate}
                    {Frequency}
                    {Category}
                    {PaymentMethod}
                    {PaymentStatus}
                    <ScrollBar orientation="vertical"></ScrollBar>
                </ScrollArea>
                <div className="flex space-x-3">

                    <Button variant={"ghost"} type="reset">Reset</Button>
                    <Button variant={"default"} type='submit'>Save</Button>
                </div>

            </form>
        </Form>
    )
}
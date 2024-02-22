export interface IParsedData {
  dueDate: string;
  name: string;
  amount: number;
  frequency: string;
  category: string;
  paymentStatus: string;
  paymentMethod: string;
  reminders: boolean;
  notes: string;
  automaticBillDetection: boolean;
  alertsForPriceChanges: boolean;
  customizableView: string;
}
export interface IExpenseUserSplits {
  userId: number;
  splitAmount: number;
}
export type TFrequency = "monthly" | "quarterly" | "annually";
export type TPaymentMethod =
  | "credit_card"
  | "bank_transfer"
  | "cash"
  | "other"
  | "debit_card";
export type TPaymentStatus = "paid" | "unpaid" | "partial";
export type TCategory =
  | "utilities"
  | "rent"
  | "insurance"
  | "other"
  | "food"
  | "wellness"
  | "housing"
  | "entertainment"
  | "transport";
export type TRole = "USER" | "ADMIN";
export interface IExpenseData {
  id: number;
  createdById: number;
  dueDate: string;
  name: string;
  amount: number;
  frequency: TFrequency;
  category: TCategory;
  paymentStatus: TPaymentStatus;
  paymentMethod: TPaymentMethod;
  reminders: boolean;
  notes: string;
  automaticBillDetection: boolean;
  alertsForPriceChanges: boolean;
  userSplits: [IExpenseUserSplits];
}
export interface ICatData {
  name: string;
  amount: number;
}
export interface searchProps {
  userData: IUser;
  searchedExpenses: IExpenseData[];
  AllUserExpenses: IExpenseData[];
}

export interface IActivity {
  parsedData: IExpenseData[];
  catData: ICatData[];
}

export interface IBarChartProps {
  parsedData: IExpenseData[];
}

export type ITopSummary = IActivity;
export type IHomeData = IActivity & {};

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userName: string;
  role: "USER" | "ADMIN";
  expensesIds?: Set<number>;
  friendsIds?: Set<number>;
}
export interface ILogin {
  password: string;
  userName: string;
}
export type TToken = string | null;
export interface IAuthContextType {
  user: IUser | null;
  token: string | null;
  register: (userData: IUser) => Promise<void> | Promise<TcustomError | null>;
  login: (userData: ILogin) => Promise<void> | Promise<TcustomError | null>;
  logout: () => Promise<void>;
}

export type TcustomError = {
  message: String;
};
export type TSection = "home" | "add-bills" | "goals" | "monthly-spending" | "profile";

export const passwordRegex = new RegExp("");
export const phoneNumberFirstRegex = new RegExp("");
export const phoneNumberLastRegex = new RegExp("");

export interface SidebarProps {
  userData: IUser;
}

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
export type TPaymentMethod = "credit_card" | "bank_transfer" | "cash" | "other";
export type TPaymentStatus = "paid" | "unpaid" | "partial";
export type TCategory = "utilities" | "rent" | "insurance" | "other";
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

export interface IActivity {
  parsedData: IParsedData[];
  catData: ICatData[];
}

export interface IBarChartProps {
  parsedData: IParsedData[];
}

export type ITopSummary = IActivity;
export type IHomeData = IActivity & {
  userData: IUser;
};

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
export type TSection = "home" | "add-bills" | "goals" | "monthly-spending";

export const passwordRegex = new RegExp("");
export const phoneNumberFirstRegex = new RegExp("");
export const phoneNumberLastRegex = new RegExp("");

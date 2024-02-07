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
  tatti: string;
};

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userName: string;
  role: "USER" | "ADMIN";
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
  logout: () => void;
}

export type TcustomError = {
  message: String;
};
export type TSection = "home" | "add-bills" | "goals" | "monthly-spending";

export const passwordRegex = new RegExp("");
export const phoneNumberFirstRegex = new RegExp("");
export const phoneNumberLastRegex = new RegExp("");

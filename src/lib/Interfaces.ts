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

export type TSection = "home" | "add-bills" | "goals" | "monthly-spending";

import { GET_SEARCH_RESULTS } from "@/server/REST_API_Const";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TFrequency, TPaymentMethod, TPaymentStatus, TCategory } from "./Interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getExpenses = async (URL: string, authToken: string) => {
  return await axios.get(GET_SEARCH_RESULTS + `${URL}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const isAmount = (value: string): Boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && !isNaN(parseFloat(value)) && value.trim() === num.toString();
}
const isDate = (value: string): Boolean => {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const matches = value.match(regex);
  // If basic format is incorrect, return false
  if (!matches) return false;
  // Extract year, month, and day as integers
  const year = parseInt(matches[1] as string, 10);
  const month = parseInt(matches[2] as string, 10);
  const day = parseInt(matches[3] as string, 10);
  // Check month and day ranges
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  // Advanced check for days in a month considering leap years
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
function isFrequency(value: string): value is TFrequency {
  return ["monthly", "quarterly", "annually"].includes(value);
}
function isPaymentMethod(value: string): value is TPaymentMethod {
  return ["credit_card", "bank_transfer", "cash", "debit_card"].includes(value);
}
function isPaymentStatus(value: string): value is TPaymentStatus {
  return ["paid", "unpaid", "partial"].includes(value);
}
function isCategory(value: string): value is TCategory {
  return ["utilities", "rent", "insurance", "food", "wellness", "housing", "entertainment", "transport"].includes(value);
}

export {
  isAmount,
  isDate,
  isFrequency,
  isPaymentMethod,
  isPaymentStatus,
  isCategory,
  getExpenses


}

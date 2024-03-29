import { atom } from "nanostores";

export const $lastTransactions = atom<Transaction[]>([]);

export interface Transaction {
  id: string;
  account_id: string;
  amount: string;
  description: string;
  created_at: string;
  updated_at: string;
}

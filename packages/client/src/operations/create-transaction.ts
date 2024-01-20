import toast from "svelte-french-toast";

import { fetcher, type FetcherResponse } from "../services/fetch";
import type { Transaction } from "../services/transactions";

import * as transactions from "../services/transactions";
import * as account from "../services/profile";

export async function createTransaction(values: {
  amount: number;
  description: string;
}) {
  try {
    const { data } = await fetcher<Transaction>(`/api/transactions`, {
      method: "POST",
      body: values,
    });

    const accountData = account.$account.get();
    account.$account.set({
      ...accountData,
      current_balance: accountData.current_balance + Number(data.amount),
    });

    const updatedTransactions = [
      data,
      ...transactions.$lastTransactions.get(),
    ].slice(0, 5);
    transactions.$lastTransactions.set(updatedTransactions);

    toast.success("Transaction has been created");
  } catch (error) {
    let requestError = error as FetcherResponse;
    toast.error(requestError.message || "error");
  }
}

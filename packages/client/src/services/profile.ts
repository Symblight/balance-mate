import { atom } from "nanostores";

interface Profile {
  info: {
    email: string;
    picture: string;
  };
}

export const $profile = atom<Profile>({
  info: {
    email: "",
    picture: "",
  },
});
interface Account {
  id: string | null;
  profile_id: string | null;
  account_name: string;
  initial_balance: number;
  current_balance: number;
  created_at: string;
  updated_at: string;
}

export const $account = atom<Account>({
  id: null,
  profile_id: null,
  account_name: "",
  initial_balance: 0,
  current_balance: 0,
  created_at: "",
  updated_at: "",
});

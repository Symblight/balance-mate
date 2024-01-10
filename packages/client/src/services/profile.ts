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

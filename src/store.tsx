import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";

export interface IUsers {
  images: string[];
  username: string;
}

export interface ILike {
  username: string;
}

export const [usersAtom] = atomsWithQuery<IUsers[]>(() => ({
  queryKey: ["users"],
  queryFn: async () => {
    const response = await fetch("/users.json");
    return response.json();
  },
}));

const likesWithLocalStorage = atom(localStorage.getItem("likes") ?? "[]");

export const parsedLikes = atom(
  (get) => {
    const localLikes = get(likesWithLocalStorage);
    const parsedData: ILike[] = JSON.parse(localLikes);
    return parsedData;
  },
  (get, set, newLike: ILike) => {
    const currentLikes = get(likesWithLocalStorage);
    const parsedData: ILike[] = [...JSON.parse(currentLikes), newLike];
    const stringifiedData = JSON.stringify(parsedData);
    localStorage.setItem("likes", stringifiedData);
    set(likesWithLocalStorage, stringifiedData);
    return parsedData;
  }
);

export const currentImageAtom = atom<number>(0);

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import userType from "@/type/UserType";

const { persistAtom } = recoilPersist({
    key : "userAtom",
    storage : localStorage,
})

export const userAtom = atom<userType>({
    key : "userAtom",
    default: {
        accessToken : "",
    },
    effects_UNSTABLE: [persistAtom],
});

export const UserSelector = selector({
    key: "userSelector",
    get: ({get}) => get(userAtom),
    set: ({set}, newValue) => set(userAtom, newValue),
})
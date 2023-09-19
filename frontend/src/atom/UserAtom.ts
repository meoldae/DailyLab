import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import userType from "@/type/UserType";

const { persistAtom } = recoilPersist({
    key : "userAtom",
    storage : localStorage,
})

const userAtom = atom<userType>({
    key : "userAtom",
    default: {
        accessToken : "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwicHJvdmlkZXIiOiJrYWthbyIsImV4cCI6MTY5NTE3NDU3OCwiaWF0IjoxNjk1MDg4MTc4LCJtZW1iZXJJZCI6IjIifQ.sc-c4O4ODkTWSij8E-cxIQp9ICyzyTDu8Q-bvBV4sPfaG9W702mwaYuvuD6g79eQWF-Hp8J1nBHQ_5FH57UJtg",
    },
    effects_UNSTABLE: [persistAtom],
});

function GetAccessToken():string {return useRecoilValue(userAtom).accessToken;}

function SetAccessToken(newAccessToken: string) {
    const setAccessToken = useSetRecoilState(userAtom);
    setAccessToken((prevState) => ({
        ...prevState,
        accessToken: newAccessToken,
    }));
}

export { userAtom, GetAccessToken, SetAccessToken };
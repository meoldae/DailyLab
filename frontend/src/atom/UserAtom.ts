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
        accessToken : "",
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
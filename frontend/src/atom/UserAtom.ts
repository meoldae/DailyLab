import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import userType from "@/type/UserType";

const { persistAtom } = recoilPersist({
    key: 'localStorage',
    storage : localStorage,
})

const userAtom = atom<userType>({
    key : "userAtom",
    default: {
        accessToken : "asdf",
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
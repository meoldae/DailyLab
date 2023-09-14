import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import userType from "@/type/UserType";

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage : sessionStorage,
})

const userAtom = atom<userType>({
    key : "userAtom",
    default: {
        userIdx : 1,
        userId : "",
        userName : "비회원",
        accessToken : "",
        isAdmin : false,
    },
    effects_UNSTABLE: [persistAtom],
});

function GetUserIdx():number {return useRecoilValue(userAtom).userIdx;}

function CheckUserIdx(checkIdx: number):boolean {return checkIdx == GetUserIdx();}

function GetUserId():string {return useRecoilValue(userAtom).userId;}

function GetUserName():string {return useRecoilValue(userAtom).userName;}

function GetAccessToken():string {return useRecoilValue(userAtom).accessToken;}

function GetIsAdmin():boolean {return useRecoilValue(userAtom).isAdmin;}

export { userAtom, GetUserIdx, CheckUserIdx, GetUserId, GetUserName, GetAccessToken, GetIsAdmin };
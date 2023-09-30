import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'localStorage',
    storage : localStorage,
})

type ProgressType = {
    status : boolean;
    percent : number;
}

const progressAtom = atom<ProgressType>({
    key : "progressAtom",
    default: {status : false, percent : 0},
    effects_UNSTABLE: [persistAtom],
});

function GetProgressStatus():boolean {return useRecoilValue(progressAtom).status;}

function SetProgressStatus(newStatus: boolean) {
    const setProgressStatus = useSetRecoilState(progressAtom);
    setProgressStatus((prevState) => ({
        ...prevState,
        status: newStatus,
    }));
}

function GetPercent():number {return useRecoilValue(progressAtom).percent;}

export { progressAtom, GetProgressStatus, SetProgressStatus, GetPercent };
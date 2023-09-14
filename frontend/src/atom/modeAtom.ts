import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'localStorage',
    storage : localStorage,
})

type modeType = {
    mode : string,
}

const modeAtom = atom<modeType>({
    key : "modeAtom",
    default: {mode : "light"},
    effects_UNSTABLE: [persistAtom],
});

function GetMode():string {return useRecoilValue(modeAtom).mode;}

function SetModeToHtml():void {
    if(GetMode() == 'dark'){
    document.getElementsByTagName('html')[0].classList.add('dark');
    document.getElementsByTagName('html')[0].classList.remove('light');
    } else {
        document.getElementsByTagName('html')[0].classList.add('light');
        document.getElementsByTagName('html')[0].classList.remove('dark');
    
    }
}

export { modeAtom, GetMode, SetModeToHtml };
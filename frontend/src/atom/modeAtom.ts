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
    default: {
        mode : "light",
    },
    effects_UNSTABLE: [persistAtom],
});

export { modeAtom };
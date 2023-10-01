import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import userType from "@/type/UserType";

const userAtom = atom<userType>({
    key : "userAtom",
    default: {
        accessToken : "",
    },
    effects: [
        ({setSelf, onSet}) => {
            const savedData = localStorage.getItem("userAtom");
            if(savedData) setSelf(JSON.parse(savedData));

            onSet((newValue, _, isReset) => {
                isReset
                  ? localStorage.removeItem("userAtom")
                  : localStorage.setItem("userAtom", JSON.stringify(newValue));
            });
        }
    ]
});

export { userAtom };
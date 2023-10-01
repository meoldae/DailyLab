import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { UserSelector } from "@/atom/UserAtom";

export default function Logout() {

    const navigate = useNavigate(); 
    const [, setUser] = useRecoilState(UserSelector);

    setUser({accessToken : ""});
    localStorage.removeItem("userAtom");
    navigate("/login");

    return (
        <></>
    )
}
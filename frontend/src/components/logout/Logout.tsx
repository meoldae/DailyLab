import { useNavigate } from "react-router-dom";
import { SetAccessToken } from "@/atom/UserAtom";

export default function Logout() {

    const navigate = useNavigate(); 

    void SetAccessToken("");
    localStorage.removeItem("userAtom");
    navigate("/login");

    return (
        <></>
    )
}
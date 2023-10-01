import { useNavigate } from "react-router-dom";
import { userAtom } from '@/atom/UserAtom';
import { useRecoilState } from 'recoil';

export default function Logout() {

    const [, setToken] = useRecoilState(userAtom);

    const navigate = useNavigate();

    setToken({accessToken : ""});
    localStorage.removeItem("userAtom");
    navigate("/login");

    return (
        <></>
    )
}
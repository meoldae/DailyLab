import { useNavigate } from "react-router-dom";
import { userAtom } from '@/atom/UserAtom';
import { useResetRecoilState } from 'recoil';

export default function Logout() {

    const setToken = useResetRecoilState(userAtom);
    setToken();

    const navigate = useNavigate();

    localStorage.removeItem("userAtom");
    
    navigate("/login");

    return (
        <></>
    )
}
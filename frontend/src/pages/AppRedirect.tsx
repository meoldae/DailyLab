import { useRecoilState } from "recoil";
import { UserSelector } from "@/atom/UserAtom";
import { useNavigate } from 'react-router-dom';

const AppRedirect = () => {
    const navigate = useNavigate(); 
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const [, setUser] = useRecoilState(UserSelector);
    
    if (token !== null) {
        setUser({accessToken: token});
        navigate('/'); 
    }
    return (
        <></>
    )
}

export default AppRedirect;
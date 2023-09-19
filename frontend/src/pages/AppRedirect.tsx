import { SetAccessToken } from "@/atom/UserAtom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AppRedirect = () => {
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
    
        if (token !== null) {
            SetAccessToken(token);
            navigate('/'); 
        }
      }, []);
    return (
        <></>
    )
}

export default AppRedirect;
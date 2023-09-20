import { SetAccessToken } from "@/atom/UserAtom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AppRedirect = () => {
    const navigate = useNavigate(); 
    
    useEffect(() => {
        alert('asdfasdf')
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log(token)
        alert('test')
    
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
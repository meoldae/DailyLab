import { useNavigate } from 'react-router-dom';

const AppRedirect = () => {
    const navigate = useNavigate(); 
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (token !== null) {
        //SetAccessToken(token);
        navigate('/'); 
    }
    return (
        <></>
    )
}

export default AppRedirect;
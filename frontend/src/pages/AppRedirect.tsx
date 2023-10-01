import { useRecoilState } from 'recoil';
import { userAtom } from '@/atom/UserAtom';
import { useNavigate } from 'react-router-dom';

const AppRedirect = () => {
    const navigate = useNavigate(); 

    const [, setLoginInfo] = useRecoilState(userAtom);
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (token !== null) {
        setLoginInfo((prevState) => ({...prevState, accessToken : token}));
        navigate('/'); 
    }
    return (
        <></>
    )
}

export default AppRedirect;
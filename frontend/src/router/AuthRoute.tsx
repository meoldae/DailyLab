import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router';
import { userAtom } from '@/atom/UserAtom';
import { useRecoilState } from 'recoil';

/**
 * 접근한 페이지에 맞는 권한을 가지고 있는지 판단
 * 권한 목록
 * NotUser
 * NotAdmin
 * User
 * Admin
 */

interface AuthRouteProps {
    children? : ReactElement;
    authentication : string;
}

export default function AuthRoute({ authentication } : AuthRouteProps) {

    const [token, setToken] = useRecoilState(userAtom);
    //로그인되었는지
    let isLogin = (token.accessToken != "" && token.accessToken != "undefined");

    if(localStorage.getItem("userAtom") != "" && localStorage.getItem("userAtom") != null && localStorage.getItem("userAtom") != undefined && token.accessToken != "undefined" && token.accessToken != undefined && token.accessToken != JSON.parse(localStorage.getItem("userAtom")!).accessToken && JSON.parse(localStorage.getItem("userAtom")!).accessToken != "undefined"){
        setToken(JSON.parse(localStorage.getItem("userAtom")!));
        isLogin = true;
    }

    if(token.accessToken == "undefined"){
        setToken({accessToken : ""});
    }

    const authText = authentication;
    
    if(authText.indexOf('Not') == -1){ //로그인이 필요한 곳을 접근하려고 할 때
        if(isLogin) return <Outlet />; //로그인이 되어있을 때
        else return <Navigate to={redirect(true, authText)} />;
    } else { //로그인이 필요하지 않은 곳을 접근하려고 할 때
        if(!isLogin) return <Outlet />;
        else return <Navigate to={redirect(false, authText.slice(3))} />;
    }
}

//redirect가 필요한 경우 어디로 보내야하는지 계산해주는 함수
function redirect(needLogin: boolean, authText: string): string {
    let result = needLogin ? "/login" : "/";
    switch(authText){
        case "Admin" :
            result = "/adm" + result;
            break;
    }
    return result;
}
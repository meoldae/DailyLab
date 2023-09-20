import { NavLink } from "react-router-dom";
import inform from "@/resources/img/login/inform.png";
import loginNaver from "@/resources/img/login/login_naver.png";
import loginKakao from "@/resources/img/login/login_kakao.png";
import loginGoogle from "@/resources/img/login/login_google.png";

const Login = () => {
    
    const loginHandler = (service : string) => {
        //const redirectUrl = (import.meta.env.VITE_DEV_API as string) + 'oauth2/authorization/' + service;
        const redirectUrl = "https://www.naver.com";
        window.location.replace(redirectUrl);
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="mb-52" style={{fontFamily:'PartialSansKR'}}>
                    <div className="w-[260px] text-center">
                        <p className="text-lg my-5">당신의 하루를 연구합니다</p>           
                        <p className="text-7xl">하루연구소</p>                
                    </div>
                </div>
                <div className="
                child-[*]:block
                child-[*:not(:last-child)]:mb-4
                child-[*:last-child]:mb-0">
                    <NavLink to="/intro">
                        <img src={inform} alt="연구원 소개" />
                    </NavLink>
                    <button onClick={() => loginHandler('naver')}>
                        <img src={loginNaver} alt="네이버로그인" />
                    </button>
                    <button onClick={() => loginHandler('kakao')}>
                        <img src={loginKakao} alt="카카오로그인" />
                    </button>
                    <button onClick={() => loginHandler('google')}>
                        <img src={loginGoogle} alt="구글로그인" />
                    </button>
                </div>
            </div>
            <div className="z-[-1] absolute top-[20px] left-[-20px] bg-[url('./resources/img/login/login_bg.png')] bg-cover w-[calc(100%+20px)] h-[calc(100%-20px)]"></div>
        </div>
    )
}

export default Login;
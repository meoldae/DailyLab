import { NavLink } from "react-router-dom";

const Login = () => {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="absolute top-1/4 left-[calc(50%-130px)]" style={{fontFamily:'PartialSansKR'}}>
                <div className="w-[260px] text-center">
                    <p className="text-lg my-5">당신의 하루를 연구합니다</p>           
                    <p className="text-7xl">하루연구소</p>                
                </div>
            </div>
            <div className="absolute left-[calc(50%-97px)] top-1/2">
                <NavLink to="/intro">
                    <div className="my-4 bg-[url('./resources/img/login/inform.png')] bg-cover w-[193px] h-[48px]"></div>
                </NavLink>
                <div className="my-4 bg-[url('./resources/img/login/login_naver.png')] bg-cover w-[193px] h-[48px]"></div>
                <div className="my-4 bg-[url('./resources/img/login/login_kakao.png')] bg-cover w-[193px] h-[48px]"></div>
                <div className="my-4 bg-[url('./resources/img/login/login_google.png')] bg-cover w-[193px] h-[48px]"></div>
            </div>
            <div className="mt-20 -ml-20 bg-[url('./resources/img/login/login_bg.png')] bg-cover w-[100vh+20px] h-screen"></div>
        </div>
    )
}

export default Login;
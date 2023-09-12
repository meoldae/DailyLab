const Login = () => {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="absolute top-1/4 left-[calc(50%-130px)]" style={{fontFamily:'PartialSansKR'}}>
                <div className="w-[260px] text-center">
                    <p className="text-lg my-5">당신의 하루를 연구합니다</p>           
                    <p className="text-7xl">하루연구소</p>                
                </div>
            </div>    
            <div className="absolute text-center">
                <div className="flex justify-center align-middle w-[200px] h-[50px] rounded-lg bg-black text-white">
                    <p className="text-3xl">연구원 소개</p>
                </div>
            </div>
            <div className="mt-20 -ml-20 bg-[url('./resources/img/login/login_bg.png')] bg-cover w-[100vh+20px] h-screen"></div>
        </div>
    )
}

export default Login;
import { NavLink } from "react-router-dom";
import settingIconImg from '@/resources/img/header/header_setting_icon.png';

export default function Header() {


    return (
        <header className="flex justify-end pt-[20px] pr-[20px]">
            <div className="w-screen h-screen z-[-1] fixed left-0 top-0 opacity-60 bg-black text-0">헤더 메뉴 active시 screen 배경</div>
            <button><img src={settingIconImg} alt="설정 아이콘" className='w-[24px]'/></button>
            <ul className="bg-white absolute
            child-[li:not(:last-child)]:text-[13px]
            child-[li:last-child]:text-0
            ">
                <li><NavLink to="/mypage">마이페이지</NavLink></li>
                <li>로그아웃</li>
                <li>모드 바꾸기</li>
            </ul>
            
        </header>
    )
}
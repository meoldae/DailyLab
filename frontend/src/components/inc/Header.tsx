import { useRef } from "react";
import { NavLink } from "react-router-dom";
import settingIconImg from '@/resources/img/header/header_setting_icon.png';
import headerMenuTriangle from '@/resources/img/header/header_menu_triangle_icon.png';
import headerMenuLightIcon from '@/resources/img/header/header_light_mode_icon.png';
import headerMenuDarkIcon from '@/resources/img/header/header_dark_mode_icon.png';


export default function Header() {
    const headerMenuBg = useRef<HTMLDivElement>(null);
    const headerMenuCon = useRef<HTMLDivElement>(null);
    function toggleHeaderMenu(e: React.MouseEvent):void{
        e.preventDefault();
        headerMenuBg.current!.classList.toggle('opacity-0');
        headerMenuBg.current!.classList.toggle('z-[-1]');
        headerMenuBg.current!.classList.toggle('z-[999]');
        headerMenuBg.current!.classList.toggle('opacity-60');
        headerMenuCon.current!.classList.toggle('z-[-1]');
        headerMenuCon.current!.classList.toggle('z-[1000]');
        if(headerMenuCon.current!.style.height == '135px'){
            headerMenuCon.current!.style.transition = '';
            headerMenuCon.current!.style.height = '';
        }else {
            headerMenuCon.current!.style.transition = 'height 0.2s ease';
            headerMenuCon.current!.style.height = '135px';
        }
    }

    return (
        <header className="flex justify-end pt-[20px] pr-[20px] overflow-hidden">
            <div className="w-screen h-screen z-[-1] absolute left-0 top-0 opacity-0 bg-black text-0 transition-all" onClick={toggleHeaderMenu} ref={headerMenuBg}>헤더 메뉴 active시 screen 배경</div>
            <button type="button" onClick={toggleHeaderMenu}><img src={settingIconImg} alt="설정 아이콘" className='w-[24px]'/></button>
            <div className="top-[45px] right-[10px] absolute text-right overflow-hidden h-0 z-[-1]" ref={headerMenuCon}>
                <img className="inline-block w-[30px] z-[2] relative -mb-[1px] mr-[10px]" src={headerMenuTriangle} alt="헤더 메뉴 삼각형 아이콘" />
                    <ul className="bg-white text-center rounded-[10px] overflow-hidden border-[1px] border-black
                    child-[li]:text-[13px] child-[li]:font-medium child-[li]:px-[50px] child-[li]:py-[8px] child-[li]:border-b-[1px] child-[li]:border-black
                    child-[li:last-child]:text-0 child-[li:last-child]:border-b-0
                    ">
                        <li className="hover:bg-[#CFCFCF] transition-all cursor-pointer"><NavLink to="/mypage">마이페이지</NavLink></li>
                        <li className="hover:bg-[#CFCFCF] transition-all cursor-pointer">로그아웃</li>
                        <li className="flex justify-center items-center">
                            <img src={headerMenuLightIcon} alt="라이트 모드" />
                            <input type="checkbox" id="selectMode" className="w-0 h-0 opacity-0 peer/select_mode"/>
                            <label className="mx-[5px] bg-[#2A2A2A] relative w-[23px] h-[14px] inline-block rounded-[7px] peer-checked/select_mode:child-[span]:left-[10px] cursor-pointer" htmlFor="selectMode">
                                <span className="w-[11px] h-[11px] absolute top-[1px] left-[2px] bg-white rounded-[50%] transition-all">모드 바꾸기</span>
                            </label>
                            <img src={headerMenuDarkIcon} alt="다크 모드" />
                        </li>
                    </ul>
            </div>
            
        </header>
    )
}
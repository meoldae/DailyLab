import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { GetMode, modeAtom } from "@/atom/modeAtom";
import settingIconImgLight from 'public/assets/img/header/header_setting_icon_light.png';
import settingIconImgDark from 'public/assets/img/header/header_setting_icon_dark.png';
import headerMenuTriangleLight from 'public/assets/img/header/header_menu_triangle_icon_light.png';
import headerMenuTriangleDark from 'public/assets/img/header/header_menu_triangle_icon_dark.png';
import headerMenuLightIconLight from 'public/assets/img/header/header_light_mode_icon_light.png';
import headerMenuLightIconDark from 'public/assets/img/header/header_light_mode_icon_dark.png';
import headerMenuDarkIconLight from 'public/assets/img/header/header_dark_mode_icon_light.png';
import headerMenuDarkIconDark from 'public/assets/img/header/header_dark_mode_icon_dark.png';
import { useSetRecoilState } from "recoil";
import { useProgress } from "@/atom/ProgressAtom";
import Progress from "@/components/progress/Progress";
import { UpdateLocation } from "@/api/User";


export default function Header() {

    navigator.geolocation.watchPosition(function(position) {
        const locationParam = {
            "latitude" : position.coords.latitude,
            "longitude" : position.coords.longitude
        }
        UpdateLocation(locationParam, ({data}) => {}, (error) => console.log(error));
    });

    const { progress } = useProgress();
    const changeMode = useSetRecoilState(modeAtom);
    const isLight = GetMode() == 'light';

    function changeModeEvent():void {
        const resultMode = isLight ? 'dark' : 'light'; 
        changeMode({mode : resultMode});
    }

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
        <header className="relative flex justify-end pt-[20px] pr-[20px] top-0 left-0 w-full">
            <div className="w-screen min-h-screen h-full z-[-1] fixed left-0 top-0 opacity-0 bg-text text-0 transition-all" onClick={toggleHeaderMenu} ref={headerMenuBg}>헤더 메뉴 active시 screen 배경</div>
            <button type="button" onClick={toggleHeaderMenu}><img src={isLight ? settingIconImgLight : settingIconImgDark} alt="설정 아이콘" className='w-[24px]'/></button>
            <div className="top-[45px] right-[10px] absolute text-right overflow-hidden h-0 z-[-1]" ref={headerMenuCon}>
                <img className="inline-block w-[30px] z-[2] relative -mb-[1px] mr-[10px]" src={isLight ? headerMenuTriangleLight : headerMenuTriangleDark} alt="헤더 메뉴 삼각형 아이콘" />
                    <ul className="bg-primary text-center rounded-[10px] overflow-hidden border-[1px] border-black
                    child-[li]:text-[13px] child-[li]:font-medium child-[li]:px-[50px] child-[li]:py-[8px] child-[li]:border-b-[1px] child-[li]:border-black
                    child-[li:last-child]:text-0 child-[li:last-child]:border-b-0
                    ">
                        <li className="hover:bg-[#CFCFCF] transition-all cursor-pointer"><NavLink to="/mypage">마이페이지</NavLink></li>
                        <li className="hover:bg-[#CFCFCF] transition-all cursor-pointer"><NavLink to="/logout">로그아웃</NavLink></li>
                        <li className="flex justify-center items-center">
                            <img src={isLight ? headerMenuLightIconLight : headerMenuLightIconDark } alt="라이트 모드" />
                            <input type="checkbox" id="selectMode" className="w-0 h-0 opacity-0 peer/select_mode" defaultChecked={!isLight} onChange={changeModeEvent}/>
                            <label className="mx-[5px] bg-text relative w-[23px] h-[14px] inline-block rounded-[7px] peer-checked/select_mode:child-[span]:left-[10px] cursor-pointer" htmlFor="selectMode">
                                <span className="w-[11px] h-[11px] absolute top-[1px] left-[2px] bg-primary rounded-[50%] transition-all">모드 바꾸기</span>
                            </label>
                            <img src={isLight ? headerMenuDarkIconLight : headerMenuDarkIconDark } alt="다크 모드" />
                        </li>
                    </ul>
            </div>
            {progress.isShow ? <Progress/> : null}
        </header>
    )
}
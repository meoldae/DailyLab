import { NavLink } from "react-router-dom";
import { GetMode } from "@/atom/modeAtom";

export default function Footer() {
    const isLight = GetMode() == 'light';
    console.log(isLight);
    return (
        <footer className="w-full flex justify-between overflow-hidden fixed left-0 bottom-0 rounded-t-2xl px-[23px] py-[15px] bg-primary child-[a]:inline-block child-[a]:bg-cover child-[a]:w-[40px] child-[a]:h-[40px] child-[a]:text-0 ">
            <NavLink to="/info" className={({isActive}: {isActive : boolean}) => getBgClass(isActive, 0)}>정보입력</NavLink>
            <NavLink to="/" className={({isActive}: {isActive : boolean}) => getBgClass(isActive, 1)}>홈</NavLink>
            <NavLink to="/schedule" className={({isActive}: {isActive : boolean}) => getBgClass(isActive, 2)}>일정</NavLink>
            <NavLink to="/statistics" className={({isActive}: {isActive : boolean}) => getBgClass(isActive, 3)}>통계</NavLink>
        </footer>
    )

    function getBgClass(activeStatus: boolean, index: number ):string {
        if(index == 0) return (activeStatus ? "bg-[url('./resources/img/footer/footer_info_img_000_active.png')]" : "hover:bg-[url('./resources/img/footer/footer_info_img_000_active.png')] " + (isLight ? "bg-[url('./resources/img/footer/footer_info_img_000_light.png')]" : "bg-[url('./resources/img/footer/footer_info_img_000_dark.png')]"));
        else if(index == 1) return (activeStatus ? "bg-[url('./resources/img/footer/footer_info_img_001_active.png')]" : "hover:bg-[url('./resources/img/footer/footer_info_img_001_active.png')] " + (isLight ? "bg-[url('./resources/img/footer/footer_info_img_001_light.png')]" : "bg-[url('./resources/img/footer/footer_info_img_001_dark.png')]"));
        else if(index == 2) return (activeStatus ? "bg-[url('./resources/img/footer/footer_info_img_002_active.png')]" : "hover:bg-[url('./resources/img/footer/footer_info_img_002_active.png')] " + (isLight ? "bg-[url('./resources/img/footer/footer_info_img_002_light.png')]" : "bg-[url('./resources/img/footer/footer_info_img_002_dark.png')]"));
        else return (activeStatus ? "bg-[url('./resources/img/footer/footer_info_img_003_active.png')]" : "hover:bg-[url('./resources/img/footer/footer_info_img_003_active.png')] " + (isLight ? "bg-[url('./resources/img/footer/footer_info_img_003_light.png')]" : "bg-[url('./resources/img/footer/footer_info_img_003_dark.png')]"));
    }
}


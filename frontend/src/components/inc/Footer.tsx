import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="fixed left-0 bottom-0 rounded-t-lg">
            <NavLink to="/info" className={({isActive}: {isActive : boolean}) => createFooterClass(0, isActive)}>정보입력</NavLink>
            <NavLink to="/" className={({isActive}: {isActive : boolean}) => isActive ? "bg-[url('./resources/img/footer_info_img_active_001.png')] inline-block bg-cover w-[40px] h-[40px] text-0" : "bg-[url('./resources/img/footer_info_img_001.png')] hover:bg-[url('./resources/img/footer_info_img_active_001.png')] inline-block bg-cover w-[40px] h-[40px] text-0"}>홈</NavLink>
            <NavLink to="/schedule">일정</NavLink>
            <NavLink to="/statistics">통계</NavLink>
        </footer>
    )

    function createFooterClass(idx : number, active: boolean):string {
        const defaultClass = ' inline-block bg-cover w-[40px] h-[40px] text-0';
        const imgPath = "./resource/img/";
        const defaultImg = imgPath + "footer_info_img_00";
        const activeImg = imgPath + "footer_info_img_active_00";
        //const result = active ? 'bg-[url(\'' + activeImg + String(idx) + '.png\')]' : 'bg-[url(\'' + defaultImg + String(idx) + '.png\')] ' + 'hover:bg-[url(\'' + activeImg + String(idx) + '.png\')]';
        const result = active ? 'bg-[url(\'./resource/img/footer_info_img_000.png\')]' : 'bg-[url(\'resource/img/footer_info_img_000.png\')] ' + 'hover:bg-[url(\'resource/img/footer_info_img_000.png\')]';
        return result + defaultClass;
    }
}


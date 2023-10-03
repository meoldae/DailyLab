import BlackList from './blacklist/BlackList';
import CustomHobby from './hobby/CustomHobby';
import Mbti from './mbti/Mbti';
import Job from './job/Job';
import Religion from './religion/Religion';
import Goal from './goal/Goal';
import { marco2Img } from '../character/Character';


const Info = () => {

    return (
        <>
            <div className="flex justify-start items-center pr-[10px]">
                <img className="w-[90px]" src={marco2Img} alt="마르코"/>
                <p className="-mt-4 text-2xl font-semibold">연구자료를 모으고 있어요</p>
            </div>
            <div className="mb-[20px] -mt-[30px]">
                <CustomHobby />
            </div>
            <div className="relative bg_contents_con p-[20px] mb-[20px]">
                <div className="text-[15px] mb-[10px] font-semibold">성향을 알려주세요</div>
                <Mbti/>
                <div className="text-[15px] mb-[10px] font-semibold">어떤일을 하시나요?</div>
                <Job/>
                <div className="text-[15px] mb-[10px] font-semibold">종교를 알려주세요</div>
                <Religion/>
                <div className="text-[15px] mb-[10px] font-semibold">목표가 무엇인가요?</div>
                <Goal />
            </div>
            <BlackList />
        </>
    )
}

export default Info;
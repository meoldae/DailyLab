import ExceptList from './except/ExceptList';
import CustomHobby from './hobby/CustomHobby';
import Mbti from './mbti/Mbti';

const Info = () => {

    return (
        <>
            <div className="flex justify-start items-center pr-[10px]">
                <img className="w-[90px]" src="@/resources/img/character/marco_2.png" alt="마르코"/>
                <p className="-mt-4 text-2xl font-semibold">마르코에게 알려주세요</p>
            </div>
            <div className="mb-[20px]">
                <CustomHobby />
            </div>
            <div className="relative bg_contents_con p-[20px] mb-[20px]">
                <div className="text-[15px] mb-[10px] font-semibold">성향을 알려주세요</div>

                <div className="text-[15px] mb-[10px] font-semibold">어떤일을 하시나요?</div>
                <Mbti/>
                <div className="text-[15px] mb-[10px] font-semibold">종교를 알려주세요</div>
            </div>
            <ExceptList />
        </>
    )
}

export default Info;
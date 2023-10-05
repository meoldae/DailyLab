import { marco2Img } from "@/components/character/Character";

const FlaskTutorial = () => {
    const jobList = ["직장인", "학생", "무직"];
    return(
        <>
            <div className="text-center p-[20px] font-semibold text-[24px] mt-[20px]">
                <span className="text-green">성향 입력</span>하기
            </div>
            <div className="bg_contents_con p-[20px] h-[50vh] pt-[30px]">
                {/* mbti 영역 */}
                <span className="block font-semibold text-3xl p-[20px]">성향을 알려주세요</span>
                <div className="px-[20px] mb-[30px]">
                    <div className="w-[calc(100% + 20px)] overflow-hidden -ml-[20px] child-[div]:w-[50%] child-[div]:pl-[20px] child-[div]:float-left">
                        <div className="mb-[12px]">
                            <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                                <span className="font-light cursor-pointer">내향</span>
                                <span className="text-green font-semibold">외향</span>
                            </div>
                        </div>
                        <div className="mb-[12px]">
                            <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                                <span className="font-light cursor-pointer">감각</span>
                                <span className="text-green font-semibold">직관</span>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                                <span className="text-green font-semibold">사고</span>
                                <span className="font-light cursor-pointer">감정</span>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                                <span className="text-green font-semibold">인식</span>
                                <span className="font-light cursor-pointer">판단</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="block font-semibold text-3xl p-[20px]">어떤 일을 하시나요?</span>
                <div className="mb-[45px]">
                    <div className="flex justify-around items-center flex-wrap child-[div]:mr-[10px] child-[div]:mb-[15px] -mb-[15px]">
                        {jobList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input className="opacity-0 peer/job" type="radio" id={"job" + String(index)} value={item} name="job" checked={item == '직장인'}/>
                                    <label className="pl-[30px] relative peer-checked/job:after:opacity-100 peer-checked/job:font-semibold peer-checked/job:text-green peer-checked/job:before:border-green text-[13px] pt-[3px] pb-[2px]
                                before:content-[''] before:border-[2px] before:border-gray before:rounded-full before:w-[20px] before:h-[20px] before:inline-block before:absolute before:top-0 before:left-0
                                after:content-[''] after:opacity-0 after:bg-green after:rounded-full after:absolute after:top-[4px] after:left-[4px] after:w-[12px] after:h-[12px] after:inline-block" htmlFor={"job" + String(index)}>{item}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* 설명 부분 */}
            <div className="flex text-center ">
                <img className="w-[150px] -mt-[30px]" src={marco2Img} alt="" />
                <span className="mt-[20px] text-2xl !font-light">성향을 알려주세요!<br/>받은 정보를 통해 <br/>할 일을 추천해드릴게요!</span>
            </div>
        </>
    )
}

export default FlaskTutorial;
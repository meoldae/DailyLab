import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { CheckUserStatus, UpdateSignUp } from "@/api/User";
import { cloeImg, cocoImg, diegoImg, ianImg, marcoImg } from "../character/Character";
import { toStringByFormatting } from "@/utils/date/DateFormatter";
import { successMsg } from '@/utils/customToast/CustomToast';

const SignUp = () => {
    const navigate = useNavigate(); 
    const id = new URLSearchParams(window.location.search).get("id");
    const dateInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        CheckUserStatus(Number(id), ({data}) => {
            const result = data.data as string;
            if(result.includes("Member") && !result.includes("temp")){
                alert("잘못된 접근입니다.");
                navigate('/');
            }
        }, (error) => console.log(error));
    }, []);

    const [birth, setBirth] = useState("");
    function birthChange(e: React.ChangeEvent<HTMLInputElement>){setBirth(() => e.target.value);}

    const [gender, setGender] = useState("M");
    function genderChange(e: React.ChangeEvent<HTMLInputElement>){setGender(() => e.target.value);}

    async function doSignUp() {
        if(birth == undefined || birth == ""){
            successMsg("생년월일을 선택해주세요");
            return dateInput.current?.focus();
        }
        const param = {memberId: id, gender: gender, birthDay: birth};
        await UpdateSignUp(param, ({data}) => {
            navigate(`/oauth2/redirect?token=${data.data as string}`);
        }, (error) => {console.log(error)});
    }
    
    return (
        <div className="mt-[calc(30%)]">
            <div className="bg_contents_con p-[20px] text-2xl child-[div:not(:last-child)]:mb-[30px]">
                <div className="text-center text-3xl font-semibold mt-[50px]">
                    저희와 함께 해 주세요!
                </div>
                <div className="flex my-[30px] child-[img]:w-[60px] justify-center">
                    <img src={ianImg} alt="" />
                    <img src={diegoImg} alt="" />
                    <img src={cocoImg} alt="" />
                    <img src={cloeImg} alt="" />
                    <img src={marcoImg} alt="" />
                </div>
                <div className="mt-[50px]">
                    <div className="float-left mt-[10px] min-w-[100px] text-[15px]">생년월일 : </div>
                    <div className="overflow-hidden">
                        <input ref={dateInput} className="bg-secondary py-[10px] px-[15px] text-[15px] font-normal w-full" type="date" onChange={birthChange} onKeyDown={(e) => e.preventDefault()} placeholder="생년월일을 선택해주세요" max={toStringByFormatting(new Date())} />
                    </div>
                </div>
                <div>
                    <div className="float-left min-w-[100px] text-[15px]">성별 : </div>
                    <div className="overflow-hidden child-[div]:inline-block child-[div:not(:last-child)]:mr-[10px]">
                        <div>
                            <input className="opacity-0 peer/gender"  type='radio' name="gender" id="male" value="M"
                                checked={gender === "M"} // gender 상태와 비교하여 checked 상태를 설정합니다.
                                onChange={genderChange} />
                            <label className="pl-[30px] relative peer-checked/gender:after:opacity-100 inline-block pt-[1px] pb-[2px]
                            before:border-box before:content-[''] before:border-[2px] before:border-gray before:rounded-full before:w-[22px] before:h-[22px] before:inline-block before:absolute before:top-[1px] before:left-0
                            after:content-[''] after:opacity-0 after:bg-green after:rounded-full after:absolute after:top-[6px] after:left-[5px] after:w-[12px] after:h-[12px] after:inline-block" htmlFor='male'
                            >남</label>
                        </div>
                        <div>
                            <input className="opacity-0 peer/gender"  type='radio' name="gender" id="female"  value="F"
                                checked={gender === "F"} // gender 상태와 비교하여 checked 상태를 설정합니다.
                                onChange={genderChange}/>
                            <label className="pl-[30px] relative peer-checked/gender:after:opacity-100 inline-block pt-[1px] pb-[2px]
                            before:border-box before:content-[''] before:border-[2px] before:border-gray before:rounded-full before:w-[22px] before:h-[22px] before:inline-block before:absolute before:top-[1px] before:left-0
                            after:content-[''] after:opacity-0 after:bg-green after:rounded-full after:absolute after:top-[6px] after:left-[5px] after:w-[12px] after:h-[12px] after:inline-block" htmlFor='female'>여</label>
                        </div>
                    </div>
                </div>
                <div className="mt-[60px] text-center">
                    <button onClick={doSignUp} className="py-4 px-10 bg-text text-[21px] text-primary rounded-xl">회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
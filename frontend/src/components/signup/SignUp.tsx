import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SetAccessToken } from "@/atom/UserAtom";
import { UpdateSignUp } from "@/api/User";
import { toStringByFormatting } from "@/utils/date/DateFormatter";

const SignUp = () => {
    const id = new URLSearchParams(window.location.search).get("id");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("M");
    const navigate = useNavigate(); 
    
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    const getRecommendTodo = async () =>{
        const curDate = toStringByFormatting(new Date());
        await makePlanTodoList(curDate, ({data}) => {
            console.log(data.data)
        }, (error) => {console.log(error)})
    }

    const doSignUp = async () => {
        const param = {memberId: id, gender: gender, birthDay: birth};
        await UpdateSignUp(param, ({data}) => {
            SetAccessToken(data.data as string);
        }, (error) => {console.log(error)});
    };

    const handleSignUp = () => {
        doSignUp();
        getRecommendTodo();
        navigate('/');        
    };
    
    return (
        <div className="text-center m-8 p-8 text-2xl mt-10 border border-text rounded-2xl">
            <div className="mb-8">
                <label className="mr-4" htmlFor="birthDate">생년월일 : </label>
                <input type="date" name="birthDate" id="birthDate" value={birth} onChange={(e) => setBirth(e.target.value)}  />
            </div>
            <div className="m-auto w-60 flex justify-between">
                <p>성별 : </p>
                <div className="">
                    <input className="opacity-0 peer/gender"  type='radio' name="gender" id="male" value="M"
                        checked={gender === "M"} // gender 상태와 비교하여 checked 상태를 설정합니다.
                        onChange={handleGenderChange} />
                    <label className="pl-[30px] relative peer-checked/gender:after:opacity-100
                    before:content-[''] before:border-[2px] before:border-gray before:rounded-full before:w-[22px] before:h-[22px] before:inline-block before:absolute before:top-[1px] before:left-0
                    after:content-[''] after:opacity-0 after:bg-green after:rounded-full after:absolute after:top-[6px] after:left-[5px] after:w-[12px] after:h-[12px] after:inline-block" htmlFor='male'
                    >남</label>
                </div>
                <div className="">
                    <input className="opacity-0 peer/gender"  type='radio' name="gender" id="female"  value="F"
                        checked={gender === "F"} // gender 상태와 비교하여 checked 상태를 설정합니다.
                        onChange={handleGenderChange}/>
                    <label className="pl-[30px] relative peer-checked/gender:after:opacity-100
                    before:content-[''] before:border-[2px] before:border-gray before:rounded-full before:w-[22px] before:h-[22px] before:inline-block before:absolute before:top-[1px] before:left-0
                    after:content-[''] after:opacity-0 after:bg-green after:rounded-full after:absolute after:top-[6px] after:left-[5px] after:w-[12px] after:h-[12px] after:inline-block" htmlFor='female'>여</label>
                </div>
            </div>
            <button onClick={handleSignUp} className="mt-10 w-32 h-10 bg-text text-primary rounded-xl">
                회원가입
            </button>
        </div>
    )
}

export default SignUp;
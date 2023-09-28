import { useNavigate } from 'react-router-dom';
import { GetMyInfo, UpdateMyInfo, SubmitSecession } from "@/api/User";
import { useEffect, useState } from "react";
import CustomDatePicker from "@/utils/CustomDatePicker";

interface props {
    username : string;
    gender : string;
    birthday : string;
    provider : string;
}

const MyPage = () => {
    const [myInfo, setMyInfo] = useState<props>({username : "", gender : "", birthday: "1980-01-01", provider : ""});
    const [gender, setGender] = useState("");
    function genderChange(e: React.ChangeEvent<HTMLInputElement>){setGender(() => e.target.value);}
    const [birth, setBirth] = useState("1980-01-01");
    function birthChange(selectDate: string){setBirth(() => selectDate);}
    const navigate = useNavigate();

    useEffect(() => {
        GetMyInfo(({data}) => {
            const result = data.data as props;
            setMyInfo(() => result);
            setGender(() => result.gender);
            setBirth(() => result.birthday);
        }, (error) => console.log(error));
    }, []);

    async function doUpdate() {
        if(birth == undefined || birth == ""){
            alert("생년월일을 선택해주세요");
            return;
        }
        const param = {gender: gender, birthday: birth};
        await UpdateMyInfo(param, ({data}) => {}, (error) => {console.log(error)});
    }

    async function doSecession() {
        if(confirm("회원 탈퇴를 하시겠습니까?")){
            await SubmitSecession(({data}) => {
                navigate('/logout');
            }, (error) => {console.log(error)});
        }
    }

    return (
        <div className="bg_contents_con p-[20px]">
            <div className="child-[div:not(:last-child)]:mb-[15px] mb-[30px]">
                <div className="child-[div]:text-[15px]">
                <div className="float-left min-w-[100px]">소셜 : </div>
                    <div>{myInfo.provider}</div>
                </div>
                <div className="child-[div]:text-[15px]">
                <div className="float-left min-w-[100px]">이름 : </div>
                    <div>{myInfo.username}</div>
                </div>
                <div className="child-[div]:text-[15px]">
                    <div className="float-left min-w-[100px]">성별 : </div>
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
                <div className="child-[div]:text-[15px]">
                    <div className="float-left mt-[6px] min-w-[100px]">생년월일 : </div>
                    <div className="overflow-hidden">
                        <CustomDatePicker setData={birthChange} settingDate={new Date(birth)} placeholder="생년월일을 선택해주세요" maxDate={new Date()}/>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button type="button" className="rounded-[10px] w-[80px] py-[6px] bg-reverse-primary text-[13px] font-bold text-primary mr-[10px]" onClick={doUpdate}>변경</button>
                <button type="button" className="rounded-[10px] w-[80px] py-[6px] bg-gray text-[13px] font-bold text-primary" onClick={doSecession}>회원탈퇴</button>
            </div>
        </div>
    )
}

export default MyPage;
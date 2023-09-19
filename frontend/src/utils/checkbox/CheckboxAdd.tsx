const CheckboxAdd = () => {
    return (
        <div>
            <div className="text-left mb-4 ml-4 -mt-8">
                계획하신 활동이 있나요?
            </div>
            <div className="bg_contents_con p-[20px]">
                <div className="bg_contents_con type_2 p-[10px] mb-8">
                    <input className="bg-secondary text-text placeholder:text-text placeholder:font-thin" 
                    type="text" name="" id="" placeholder="키워드를 입력해주세요" />
                </div>
                <p className="text-left text-gray mb-4 text-xl font-normal">검색결과</p>
                <div className="bg_contents_con type_2 py-[10px] px-[15px] ">
                    <div className="flex w-full justify-between mb-4">
                        <div>
                            대분류 중분류 소분류
                        </div>
                        <div>
                            + 추가
                        </div>
                    </div>
                    <div className="bg-primary rounded-xl p-[10px]">
                        <input className="bg-primary text-center text-text placeholder:text-gray" 
                        type="text" name="" id="" placeholder="상세 내용이 있다면 입력해주세요" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckboxAdd;
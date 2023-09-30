import Select, { SingleValue } from 'react-select';
import { useEffect } from 'react';
import { CategoryType } from "@/type/CategoryType";
import { TodoParamType, TodoType } from "@/type/TodoType";
import { SelectType } from "@/type/SelectType";
import { useState } from "react";
import { toStringByFormatting } from '@/utils/date/DateFormatter';

interface props {
    mode : string
    info? : TodoType
    categoryList : CategoryType[]
    insertItem? : (param: TodoParamType) => void
    futureToDate? : string
    changeInsertMode? : () => void
    updateItem? : (param: TodoParamType) => void
    changeTodoUpdateMode? : (todoId: number, status: boolean) => void
}

const TodoHandleItem = (props : props) => {
    const [content, setContent] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(props.info?.categoryId);
    const [selectedFirstCategory, setSelectedFirstCategory] = useState("");
    const [selectedSecondCategory, setSelectedSecondCategory] = useState("");
    const [selectedThirdCategory, setSelectedThirdCategory] = useState("");
    const [firstCategoryList, setFirstCategoryList] = useState<SelectType[]>([]);
    const [secondCategoryList, setSecondCategoryList] = useState<SelectType[]>([]);
    const [thirdCategoryList, setThirdCategoryList] = useState<SelectType[]>([]);

    function mappingFromCategoryToSelect(categoryList: CategoryType[]): SelectType[] {
        const result:SelectType[] = [];
        categoryList.map((category) => result.push({label: category.name, value: category.name}));
        return result;
    }

    useEffect(() => {
        setContent(() => props.info?.content as string);
        const result:SelectType[] = mappingFromCategoryToSelect(props.categoryList);
        setFirstCategoryList(() => result);

        if(props.info != null && props.info != undefined){
            setSelectedFirstCategory(() => props.info!.large);
            setSelectedSecondCategory(() => props.info!.medium);
            setSelectedThirdCategory(() => props.info!.small);
        }
    }, [props]);

    useEffect(() => {
        if(selectedFirstCategory != ""){
            const temp:CategoryType[] = props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!;
            const result:SelectType[] = [];
            temp.map((category) => result.push({label: category.name, value: category.name}));
            setSecondCategoryList(() => result);
        } else setSecondCategoryList(() => []);
    }, [selectedFirstCategory]);

    useEffect(() => {
        if(selectedSecondCategory != ""){
            const result = mappingFromCategoryToSelect(props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory)!.list!);
            setThirdCategoryList(() => result);
        }
    }, [selectedSecondCategory]);

    useEffect(() => {
        if(selectedSecondCategory != "" && props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list != undefined && props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory) != undefined){
            const result = mappingFromCategoryToSelect(props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory)!.list!);
            setThirdCategoryList(() => result);
        } else setThirdCategoryList(() => []);

    }, [secondCategoryList]);

    useEffect(() => {
        if(selectedThirdCategory != "" && props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory)!.list!.find((category3) => category3.name == selectedThirdCategory) != undefined){
            const result:number = props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory)!.list!.find((category3) => category3.name == selectedThirdCategory)!.categoryId!;
            setSelectedCategoryId(() => result);
            setContent(() => selectedThirdCategory);
        } else setSelectedCategoryId(() => undefined);
    }, [selectedThirdCategory]);

    useEffect(() => {
        const content:string = thirdCategoryList.find((select) => {return select.value == selectedThirdCategory}) != undefined ? thirdCategoryList.find((select) => {return select.value == selectedThirdCategory})!.value : "";
        setContent(() => content);
    }, [selectedThirdCategory, selectedCategoryId]);

    function handleContent(e: React.ChangeEvent<HTMLInputElement>){setContent(() => e.target.value);}

    function handleSelectChange(e: SingleValue<SelectType>, depth: number){
        if(depth == 1) setSelectedFirstCategory(() => e!.value);
        if(depth == 2) setSelectedSecondCategory(() => e!.value);
        if(depth == 3) setSelectedThirdCategory(() => e!.value);
    }

    function submitInsert(){
        if(selectedCategoryId == undefined){
            alert("카테고리를 선택해주세요");
            return;
        }
        const param:TodoParamType = {
            categoryId : selectedCategoryId,
            content : content !== undefined ? content : "",
            todoDate : props.futureToDate !== undefined ? props.futureToDate : toStringByFormatting(new Date()),
            isSystem : 0,
        };
        props.insertItem!(param);
    }

    function submitUpdate(){
        if(selectedCategoryId == undefined){
            alert("카테고리를 선택해주세요");
            return;
        }
        const param:TodoParamType = {
            todoId : props.info?.todoId,
            categoryId : selectedCategoryId,
            content : content !== undefined ? content : "",
        };
        props.updateItem!(param);
    }

    return (
        <div className="w-full p-4 bg-secondary rounded-xl text-xl">
            <div className="flex mb-3">
                <Select options={firstCategoryList} onChange={(e) => handleSelectChange(e, 1)} placeholder="대분류" value={firstCategoryList.filter((item) => {return item.value == selectedFirstCategory})}/>
                <Select options={secondCategoryList} onChange={(e) => handleSelectChange(e, 2)} placeholder="중분류" value={secondCategoryList.filter((item) => {return item.value == selectedSecondCategory})}/>
                <Select className="flex-1" options={thirdCategoryList} onChange={(e) => handleSelectChange(e, 3)} placeholder="소분류" value={thirdCategoryList.filter((item) => {return item.value == selectedThirdCategory})}/>
            </div>
            <input className="w-full p-3 mb-3 rounded-xl bg-primary text-text" type="text" name="" id="" placeholder="상세 내용을 입력해주세요" value={content || ""} onChange={handleContent}/>
            {props.mode == "insert" ?
                    <div>
                        <button type="button" className='w-[50px] h-[20px] bg-text rounded-xl mx-4 text-primary' onClick={props.changeInsertMode}>취소</button>
                        <button type="button" className='w-[50px] h-[20px] bg-orange rounded-xl mx-4 text-primary' onClick={submitInsert}>확인</button>
                    </div>
                    :
                    <div>
                        <button type="button" className='w-[50px] h-[20px] bg-gray rounded-xl mx-4 text-primary' onClick={() => props.changeTodoUpdateMode!(props.info!.todoId, false)}>취소</button>
                        <button type="button" className='w-[50px] h-[20px] bg-orange rounded-xl mx-4 text-primary' onClick={submitUpdate}>수정</button>
                    </div>
                }
        </div>
    )
}

export default TodoHandleItem;
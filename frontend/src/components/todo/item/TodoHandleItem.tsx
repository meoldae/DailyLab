import { useEffect } from 'react';
import { CategoryTreeType, CategoryType } from "@/type/CategoryType";
import { TodoParamType, TodoType } from "@/type/TodoType";
import { useState } from "react";

interface props {
    mode : string
    info? : TodoType
    categoryList : CategoryTreeType[]
    insertItem? : (param: TodoParamType) => void
    changeInsertMode? : () => void
    updateItem? : (param: TodoParamType) => void
    changeTodoUpdateMode? : (todoId: number, status: boolean) => void
}

interface categoryValue {
    [key: string]: string;
    firstCategory: string;
    secondCategory: string;
    thirdCategory: string;
}

const TodoHandleItem = (props : props) => {
    const [content, setContent] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(props.info?.categoryId);
    const [selectedCategories, setSelectedCategories] = useState<categoryValue>({firstCategory: "", secondCategory: "", thirdCategory: ""});
    const [secondCategoryList, setSecondCategoryList] = useState<CategoryType[]>([]);
    const [thirdCategoryList, setThirdCategoryList] = useState<CategoryType[]>([]);

    useEffect(() => {
        setContent(() => props.info?.content as string);
        if(props.info != null && props.info != undefined){
            const result = Object.assign(selectedCategories, {});
            result.firstCategory = props.info.large;
            result.secondCategory = props.info.medium;
            result.thirdCategory = props.info.small;
            setSelectedCategories(() => result);
        }
    }, [props]);

    useEffect(() => {
        if(selectedCategories.firstCategory != ""){
            const secondResult:CategoryType[] = props.categoryList.find((category) => category.name == selectedCategories.firstCategory)!.list;
            setSecondCategoryList(() => secondResult);
            if(selectedCategories.secondCategory != ""){
                const thirdResult:CategoryType[] = props.categoryList.find((category) => category.name == selectedCategories.firstCategory)!.list
                .find((category) => category.name == selectedCategories.secondCategory)!.list;
                setThirdCategoryList(() => thirdResult);
            } else setThirdCategoryList(() => []);
        } else setSecondCategoryList(() => []);
    }, [selectedCategories])

    function handleContent(e: React.ChangeEvent<HTMLInputElement>){setContent(() => e.target.value);}

    function handleSelectChage(e: React.ChangeEvent<HTMLSelectElement>){
        const { name, value } = e.target;
        const result = JSON.parse(JSON.stringify(selectedCategories));
        result[name] = value;
        setSelectedCategories(() => result);
    }

    return (
        <div className="w-full p-4 bg-secondary rounded-xl text-xl">
            <div>
                <select name="firstCategory" id="firstCategory" value={selectedCategories.firstCategory} onChange={handleSelectChage}>
                    {props.mode == "insert" || selectedCategories.firstCategory == "" ? <option value="" disabled selected>대분류</option> : <option value="" disabled>대분류</option>}
                    {props.categoryList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                </select>
                <select name="secondCategory" id="secondCategory" value={selectedCategories.secondCategory} onChange={handleSelectChage}>
                    {props.mode == "insert" || selectedCategories.secondCategory == "" ? <option value="" disabled selected>중분류</option> : <option value="" disabled>중분류</option>}
                    {secondCategoryList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                </select>
                <select name="thirdCategory" id="thirdCategory" value={selectedCategories.thirdCategory} onChange={handleSelectChage}>
                    {props.mode == "insert" || selectedCategories.thirdCategory == "" ? <option value="" disabled selected>소분류</option> : <option value="" disabled>소분류</option>}
                    {thirdCategoryList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                </select>
            </div>
            <input className="w-full p-3 m-1 rounded-xl bg-primary text-text" type="text" name="" id="" placeholder="상세 내용을 입력해주세요" value={content || ""} onChange={handleContent}/>
            {props.mode == "insert" ?
                    <div>
                        <button type="button" onClick={props.changeInsertMode}>취소</button>
                        <button type="button">확인</button>
                    </div>
                    :
                    <div>
                        <button type="button" onClick={() => props.changeTodoUpdateMode!(props.info!.todoId, false)}>취소</button>
                        <button type="button">수정</button>
                    </div>
                }
        </div>
    )
}

export default TodoHandleItem;
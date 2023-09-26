import { useEffect } from 'react';
import { CategoryType } from "@/type/CategoryType";
import { TodoParamType, TodoType } from "@/type/TodoType";
import { useState } from "react";

interface props {
    mode : string
    info? : TodoType
    categoryList : CategoryType[]
    insertItem? : (param: TodoParamType) => void
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
    const [secondCategoryList, setSecondCategoryList] = useState<CategoryType[]>([]);
    const [thirdCategoryList, setThirdCategoryList] = useState<CategoryType[]>([]);

    useEffect(() => {
        setContent(() => props.info?.content as string);
        if(props.info != null && props.info != undefined){
            setSelectedFirstCategory(() => props.info!.large);
            setSelectedSecondCategory(() => props.info!.medium);
            setSelectedThirdCategory(() => props.info!.small);
        }
    }, [props]);

    useEffect(() => {
        if(selectedFirstCategory != ""){
            const result:CategoryType[] = props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!;
            setSecondCategoryList(() => result);
        }
    }, [selectedFirstCategory]);

    useEffect(() => {
        if(selectedSecondCategory != ""){
            const result:CategoryType[] = props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory)!.list!;
            setThirdCategoryList(() => result);
        }
    }, [selectedSecondCategory]);

    useEffect(() => {
        if(selectedSecondCategory != "" && props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list != undefined && props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory) != undefined){
            const result:CategoryType[] = props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory)!.list!;
            setThirdCategoryList(() => result);
        } else setThirdCategoryList(() => []);

    }, [secondCategoryList]);

    useEffect(() => {
        if(selectedThirdCategory != ""){
            const result:number = props.categoryList.find((category1) => category1.name == selectedFirstCategory)!.list!.find((category2) => category2.name == selectedSecondCategory)!.list!.find((category3) => category3.name == selectedThirdCategory)!.categoryId!;
            setSelectedCategoryId(() => result);
        }
    }, [selectedThirdCategory]);

    function handleContent(e: React.ChangeEvent<HTMLInputElement>){setContent(() => e.target.value);}

    function handleSelectChage(e: React.ChangeEvent<HTMLSelectElement>){
        const { name, value } = e.target;
        if(name == "firstCategory") setSelectedFirstCategory(() => value);
        if(name == "secondCategory") setSelectedSecondCategory(() => value);
        if(name == "thirdCategory") setSelectedThirdCategory(() => value);
    }

    return (
        <div className="w-full p-4 bg-secondary rounded-xl text-xl">
            <div>
                <select name="firstCategory" id="firstCategory" value={selectedFirstCategory} onChange={handleSelectChage}>
                    {props.mode == "insert" || selectedFirstCategory == "" ? <option value="">대분류</option> : <option value="">대분류</option>}
                    {props.categoryList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                </select>
                <select name="secondCategory" id="secondCategory" value={selectedSecondCategory} onChange={handleSelectChage}>
                    {props.mode == "insert" || selectedSecondCategory == "" ? <option value="">중분류</option> : <option value="">중분류</option>}
                    {secondCategoryList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                </select>
                <select name="thirdCategory" id="thirdCategory" value={selectedThirdCategory} onChange={handleSelectChage}>
                    {props.mode == "insert" || selectedThirdCategory == "" ? <option value="">소분류</option> : <option value="">소분류</option>}
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
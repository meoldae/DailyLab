import { useEffect } from 'react';
import { CategoryKeywordType } from "@/type/CategoryType";
import { TodoParamType, TodoType } from "@/type/TodoType";
import { useState } from "react";

interface props {
    mode : string
    info? : TodoType
    categoryList : CategoryKeywordType[]
    insertItem? : (param: TodoParamType) => void
    selectToDate : string
    changeInsertMode? : () => void
    updateItem? : (param: TodoParamType) => void
    changeTodoUpdateMode? : (todoId: number, status: boolean) => void
}

const TodoHandleItem = (props : props) => {
    const [content, setContent] = useState(props.info?.content || "");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(props.info?.categoryId || -1);
    const [searchMode, setSearchMode] = useState(false);
    const [keyword, setKeyword] = useState<string>(props.info?.small || "");
    const [searchItems, setSearchItems] = useState<CategoryKeywordType[]>([]);

    const onChangeData = (e:React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.value != "") setSearchMode(true);
        setKeyword(e.currentTarget.value);
    };

    function updateKeyWordList() {
        const temp:CategoryKeywordType[] = keyword != "" ? props.categoryList.filter((item) => item.name.includes(keyword) === true) : [];
        if(temp.length == 0) temp.push({name: "검색 결과가 없습니다", categoryId: -1});
        setSearchItems(temp);
    }

    const onFocusInKeyword = (e:React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.value != "") setSearchMode(true);
        setKeyword(e.currentTarget.value);
    }

    useEffect(() => {
        const searchModeRemove = () => {setSearchMode(false)};
        if(searchMode) document.body.addEventListener("click", searchModeRemove, false);
        else document.body.removeEventListener("click", searchModeRemove, false);
    }, [searchMode]);

    useEffect(() => {
        const matchCategory = props.categoryList.find(item => item.name === keyword);
        if(matchCategory !== undefined && matchCategory !== null) setSelectedCategoryId(() => matchCategory.categoryId);
        else setSelectedCategoryId(() => -1);

        const debounce = setTimeout(() => {updateKeyWordList();}, 200);
        return () => {clearTimeout(debounce);};
    }, [keyword]);

    function handleContent(e: React.ChangeEvent<HTMLInputElement>){setContent(() => e.target.value);}

    function submitInsert(){
        if(selectedCategoryId == undefined || selectedCategoryId == -1){
            alert("카테고리를 선택해주세요");
            return;
        }
        const param:TodoParamType = {
            categoryId : selectedCategoryId,
            content : content !== undefined ? content : "",
            todoDate : props.selectToDate,
            isSystem : 0,
        };
        props.insertItem!(param);
    }

    function submitUpdate(){
        if(selectedCategoryId == undefined || selectedCategoryId == -1){
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
            <div className="relative flex mb-3">
                <input className="w-full p-3 mb-3 rounded-xl bg-primary text-text" type="text" placeholder="카테고리를 검색해보세요" title="카테고리 검색" name="카테고리 검색" value={keyword}
                onChange={onChangeData} onFocus={onFocusInKeyword}/>
                {searchMode ? 
                <ul className="text-left w-full z-[2] absolute bg-primary overflow-y-auto max-h-[140px] bottom-[10px] transform translate-y-[100%] border border-gray child-[li]:cursor-pointer child-[li]:p-3 child-[li:not(:last-child)]:border-b child-[li:not(:last-child)]:border-gray">
                    {searchItems.map((search, idx) => (search.categoryId != -1 ? <li className="cursor-pointer" key={idx} onClick={() => setKeyword(search.name)}>{search.name}</li> : <li key={idx}>{search.name}</li>))}
                </ul>
                : null}
            </div>
            <input className="w-full p-3 mb-3 rounded-xl bg-primary text-text" type="text" name="" id="" placeholder="상세 내용을 입력해주세요" value={content || ""} onChange={handleContent}/>
            {props.mode == "insert" ?
                    <div className="text-center">
                        <button type="button" className='w-[50px] h-[20px] bg-text rounded-xl mx-4 text-primary' onClick={props.changeInsertMode}>취소</button>
                        <button type="button" className='w-[50px] h-[20px] bg-orange rounded-xl mx-4 text-primary' onClick={submitInsert}>확인</button>
                    </div>
                    :
                    <div className="text-center">
                        <button type="button" className='w-[50px] h-[20px] bg-gray rounded-xl mx-4 text-primary' onClick={() => props.changeTodoUpdateMode!(props.info!.todoId, false)}>취소</button>
                        <button type="button" className='w-[50px] h-[20px] bg-orange rounded-xl mx-4 text-primary' onClick={submitUpdate}>수정</button>
                    </div>
                }
        </div>
    )
}

export default TodoHandleItem;
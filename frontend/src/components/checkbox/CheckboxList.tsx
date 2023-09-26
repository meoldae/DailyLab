import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { checkUpdateTodoItem, getCategoryList, getPlanTodoList } from "@/api/Todo";
import { addHours } from "date-fns";
import CheckboxCategory from "./CheckboxCategory";

/*
--type--
1. default : 기본 체크리스트 - 메인페이지, 캘린더페이지 오늘 날짜 선택 시 / 상세입력 클릭 시 inputbox 생김.
2. defaultLock : 기본 체크리스트이지만 체크 해제/선택 불가능, 추가버튼 없음 - 캘린더페이지 과거 날짜 선택 시
*/

interface CheckboxListProps {
    type: string;
    date : string;
  }
  
interface TodoType {
    todoId: number,
    check: boolean,
    content: string,
    categoryId?: number,
    large?: string,
    medium?: string,
    small?: string,
    todoDate?: string,
    checkedDate?: string,
    memberId?: number,
    username?: string,
    system?: boolean,
    deleted?: boolean
}

interface SmallCategory {
    name: string;
    categoryId: number;
}

interface MediumCategory {
    name: string;
    small: SmallCategory[];
}

interface LargeCategory {
    name: string;
    medium: MediumCategory[];
}

const CheckboxList: React.FC<CheckboxListProps> = ({ type, date }) => {
    const [items, setItems] = useState<TodoType[]>([]);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [checkedItemNo, setCheckedItemNo] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const [newTodoContent, setNewTodoContent] = useState('');
    const [categories, setCategories] = useState<LargeCategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState({
        firstCategory: '',
        secondCategory: '',
        thirdCategory: ''
      });
    
    // 체크된 목록을 얻기 위한 부분
    const handleCheckboxChange = (index : number, isChecked : boolean) => {
        setCheckedItemNo(index);
        if (isChecked) {
            setCheckedItems([...checkedItems, index]);
        } else {
            setCheckedItems(checkedItems.filter((item: number) => item !== index));
        }
    }

    // const noRecommendTodo = () => {
    //     console.log('noRecommendTodo', checkedItems)
    //     // checkedItems를 관심없음 처리하는 API함수 호출

    //     deleteTodo();
    // }
    
    // const deleteTodo = async () => {
    //     console.log('deleteTodo', checkedItems)
    //     // checkedItems를 삭제하는 API 함수 호출하고 리스트 받아오는 API다시 요청하기
    //     const todoItems = {
    //         todoIdList: checkedItems,
    //     };

    //     await deleteTodoItems({todoIdList: todoItems.todoIdList },({ data }) => {
    //         console.log(data);
    //     }, (error) => {console.log(error)});

    // }

    const handleAddButton = () => {
        setShowInput(true); // 입력창 보이기
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoContent(e.target.value);  // 입력창에 입력할때마다 할일내용 갱신
    }

    const handleAddTodo = () => {
        // TODO 리스트 추가하는 API 호출
        setShowInput(false); // 입력창 숨기기
        setNewTodoContent(''); // 입력내용 초기화
    }

    const getTodoList = async (date : string) => {
        await getPlanTodoList(date, ({data}) => {
            setItems(data.data as TodoType[]);
        }, (error) => {console.log(error)})
    }


    const updateCheckItem = async (todoId : number) => {
        const now = new Date();
        const newDate = addHours(now, 9);
        const formattedDateTime = newDate.toISOString().slice(0, 16).replace("T", " ");

        console.log(todoId, formattedDateTime)
        const todoData = {
            todoId: todoId,
            checkedDate: formattedDateTime
        };

        await checkUpdateTodoItem(todoData,({ data }) => {
            console.log(data);
        }, (error) => {console.log(error)});
    }

    const getCategory = async () => {
        await getCategoryList(
            (data) => {
                const temp = (data.data.data.large as LargeCategory[]);
                const formattedCategories = temp.map(largeCategory => {
                    const largeName = largeCategory.name;
                    const mediumCategories = largeCategory.medium.map(mediumCategory => {
                        const mediumName = mediumCategory.name;
                        const smallCategories = mediumCategory.small.map(smallCategory => {
                            return {
                                name: smallCategory.name,
                                categoryId: smallCategory.categoryId
                            };
                        });
                        return {
                            name: mediumName,
                            small: smallCategories
                        };
                    });
                    return {
                        name: largeName,
                        medium: mediumCategories
                    };
                });
                setCategories(formattedCategories);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setSelectedCategories({
          ...selectedCategories,
          [name]: value
        });
      }
    

    // 체크한 item의 목록이 바뀔 때 마다 체크한것 확인하기
    useEffect(() => {
        if(type === 'default' && checkedItemNo !== 0){
            console.log('checkedItemNo', checkedItemNo)
            updateCheckItem(checkedItemNo);
        }
    }, [checkedItems]);

    useEffect(() => {
        // todo 리스트 불러오기
        getTodoList(date);
        getCategory();
    }, []);

    return (
        <div className="bg-primary rounded-2xl px-5 py-8 
        child-[div:not(:last-child)]:mb-4">
            {items.length > 0 && items.map((todo)=>(
                <Checkbox key={todo.todoId} todoId={todo.todoId} state={todo.check} content={todo.content} type={type} 
                large={todo.large} medium={todo.medium} small={todo.small}
                onCheckboxChange={handleCheckboxChange}/>
            ))}
            {showInput && (
                <CheckboxCategory/>
            )}
            {type == 'default' && (
                <div className="text-right text-xl text-primary">
                <button onClick={handleAddButton} className="mr-4 w-28 h-10 bg-text rounded-xl ">
                    추가
                </button>
            </div> 
            )}
        </div>
    )
}

export default CheckboxList;

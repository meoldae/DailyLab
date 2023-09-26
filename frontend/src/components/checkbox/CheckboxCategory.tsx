import { getCategoryList } from "@/api/Todo";
import { useEffect, useState } from "react";

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

interface CheckboxProps {
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
    setInputState: () => void,
}

const CheckboxCategory: React.FC<Partial<CheckboxProps>> = ({ todoId, content, large, medium, small, setInputState }) => {
    const [newTodoContent, setNewTodoContent] = useState(content === null ? '' : content);
    const [categories, setCategories] = useState<LargeCategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState({
        firstCategory: '',
        secondCategory: '',
        thirdCategory: ''
      });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoContent(e.target.value);  // 입력창에 입력할때마다 할일내용 갱신
    }

    const handleAddTodo = () => {
        // TODO 리스트 추가하는 API 호출
        setNewTodoContent(''); // 입력내용 초기화
    }

      useEffect(() => {
        // todo 리스트 불러오기
        getCategory();
        console.log("-----",todoId)
    }, []);

    return (
        <div className="w-full p-4 bg-secondary rounded-xl text-xl">
            <div className="flex items-center justify-between">
                <div className="w-full mr-10 text-left">
                    <div className="child-[select]:bg-secondary w-[300px]">
                        <select
                            name="firstCategory" 
                            id="firstCategory" 
                            value={selectedCategories.firstCategory}
                            onChange={handleCategoryChange}
                        >
                            {large === null ? (<option value="" disabled selected>대분류</option>) : (<option value={large} selected>{large}</option>)}
                            {categories.map(category => (
                                <option key={category.name} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        <select 
                            name="secondCategory" 
                            id="secondCategory" 
                            value={selectedCategories.secondCategory}
                            onChange={handleCategoryChange}
                        >
                            {large === null ? (<option value="" disabled selected>중분류</option>) : (<option value={medium} selected>{medium}</option>)}
                            {selectedCategories.firstCategory && 
                                categories.find(category => category.name === selectedCategories.firstCategory)
                                    ?.medium
                                    .map(mediumCategory => mediumCategory.name)
                                    .map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))
                            }
                        </select>
                        <select
                            name="thirdCategory" 
                            id="thirdCategory" 
                            value={selectedCategories.thirdCategory}
                            onChange={handleCategoryChange}
                        >
                            {large === null ? (<option value="" disabled selected>소분류</option>) : (<option value={small} selected>{small}</option>)}
                            {selectedCategories.firstCategory && selectedCategories.secondCategory &&
                                categories.find(category => category.name === selectedCategories.firstCategory)
                                    ?.medium
                                    .find(mediumCategory => mediumCategory.name === selectedCategories.secondCategory)
                                    ?.small
                                    .map(smallCategory => smallCategory.name)
                                    .map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))
                            }
                        </select>
                    </div>
                    {/* 여기서 완료 누르면 카테고리 적용되고 content에 상세 내용 넣기 */}
                    <div className="text-right flex">
                        <input className="w-full p-3 m-1 rounded-xl bg-primary text-text" type="text" name="" id="" placeholder="상세 내용을 입력해주세요"
                        value={newTodoContent} onChange={handleInputChange} />
                        {todoId === undefined ? (
                            <button
                            className="w-[30px] ml-4 font-semibold text-text underline underline-offset-4"
                            onClick={() => {handleAddTodo(); setInputState && setInputState(); }}
                            >
                            추가
                        </button>
                        ) : (
                            <button onClick={setInputState}
                            className="w-[30px] ml-4 font-semibold text-text underline underline-offset-4"
                            >
                            수정
                        </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}


export default CheckboxCategory;
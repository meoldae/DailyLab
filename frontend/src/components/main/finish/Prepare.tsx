import { getCategoryList } from "@/api/Todo";
import CheckboxList from "@/components/checkbox/CheckboxList";
import { useEffect, useState } from "react";

interface SmallActivity {
    name: string;
    categoryId: number;
  }
  
  interface MediumActivity {
    small: SmallActivity[];
  }
  
  interface LargeActivity {
    name: string;
    medium: MediumActivity[];
  }
  
  interface CategoryData {
    large: LargeActivity[];
  }
  

const MainPrepare = ({curDate} : {curDate : string}) => {
    const [categoryList, setCategoryList] = useState<CategoryData>({large : []});

    const getCategory = async () => {
        await getCategoryList(({data}) => {
            setCategoryList(data.data as CategoryData)
            console.log(categoryList)
        }, (error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        void getCategory();
    },[])
    
    return (
        <div className="text-center text-2xl font-semibold
        child-[div:not(:last-child)]:mb-12">
            {/* 추천 체크리스트 목록 */}
            <div className="text-right">
                <div className='flex items-center'>
                    <img className='w-[90px]' src="./assets/img/character/ian.png" alt="이안" />
                    <p className="">다음에는 이런 일 어때요?</p>
                </div>
                <div className='relative -mt-12 mb-4'>
                    <CheckboxList type='plan' date={curDate}/>
                </div>
            </div>
            {/* 버튼 */}
            <div className='m-auto w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                <p className='text-primary'>새로운 하루 시작</p>
            </div>
        </div>
    )
}

export default MainPrepare;
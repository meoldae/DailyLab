import { useNavigate } from "react-router";

const TutorialLast = () => {
    const navigator = useNavigate();
    const handleStart = () => {
        navigator('/');
    }
    
    return(
        <div className="h-[70vh] flex flex-col items-center justify-around">
            <div className="text-center text-3xl">
                <p className="font-bold mt-24">저희와 함께<br/>멋진 하루를 만들어봐요!</p>
            </div>
            <img src="./assets/img/character/together.png" alt="" />
            <button onClick={handleStart} className='w-72 h-20 bg-text rounded-2xl items-center justify-center'>
                <p className='text-primary text-2xl'>시작하기</p>
            </button>
        </div>
    )
}

export default TutorialLast;
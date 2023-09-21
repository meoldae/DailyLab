
const MainWaiting = ({getDate, curDate} : {getDate : string, curDate : string}) => {
    // 2초마다 상태 확인, 상태 finished이면 새로고침
    return (
        <div>
            {curDate} 의 일기를 작성하고 있어요
        </div>
    )
}

export default MainWaiting;
import Tab, {TabType} from '@/utils/tab/Tab';
import MainResult from "./Result";
import MainPrepare from "./Prepare";


const MainFinish = ({comp, curDate} : {comp : string, curDate : string}) => {
    const initIdx = comp == 'result' ? 0 : 1;
    const TabContents = [] as TabType[];
    TabContents.push({title : "하루 마무리", contents: <MainResult curDate={curDate}/>});
    TabContents.push({title : "내일 계획하기", contents: <MainPrepare curDate={curDate}/>});
    

    return (
        <div className="contents_wrap">
            <Tab initIdx={initIdx} TabList={TabContents}/>
        </div>
    )
}

export default MainFinish;
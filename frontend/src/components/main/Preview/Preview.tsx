import MainPrepare from "../finish/Prepare";

const MainPreview = ({ getDate, curDate} : { getDate : string, curDate : string}) => {
    return (
        <div className="contents_wrap">
            <MainPrepare getDate={getDate} curDate={curDate}/>
        </div>
    )
}

export default MainPreview;
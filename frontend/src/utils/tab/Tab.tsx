import {useState} from 'react';
import TabBtn from "./item/Btn";

export type TabType = {
  title : string;
  contents : JSX.Element;
}

const Tab = ({initIdx, TabList} : {initIdx: number, TabList: TabType[]}) => {   
  const [tabIdx, setTabIdx] = useState(initIdx);
  let Content = TabList[tabIdx].contents;
  const changeIdx = (idx: number) => {
    Content = TabList[idx].contents;
    setTabIdx(() => idx);
  }

  const btnList = [] as string[];
  for(let i=0; i < TabList.length; i++){
    btnList.push(TabList[i].title);
  }

	return (
    <div className="col-12">
      <div className="">
        <div className="m-auto mb-12 text-2xl flex w-80 justify-between">
          {btnList.map((item, index) => (
            <TabBtn key={index} idx={index} title={item} activeFlag={tabIdx == index} changeTab={changeIdx} />
          ))}
        </div>
      </div>
      <div className="">
        {Content}
      </div>
    </div>
    )
};

export default Tab;
import { useEffect } from 'react';
import { atom, useRecoilState } from "recoil";

type ProgressType = {
    isShow : boolean;
    isRunning : boolean;
    status : string;
    percent : number;
}

const progressAtom = atom<ProgressType>({
    key : "progressAtom",
    default: getInitialProgressInfo(),
});

const saveProgressInfo = (param: ProgressType) => {localStorage.setItem("progressInfo", JSON.stringify(param))};

function getInitialProgressInfo(): ProgressType {
    const storedProgressInfo = localStorage.getItem("progressInfo");
    if (storedProgressInfo) return JSON.parse(storedProgressInfo) as ProgressType;
    else return {isShow: false, isRunning: false, status: "", percent: 0};
}

export const useProgress = () => {
  const [progress, setProgress] = useRecoilState(progressAtom);

  const showProgress = () => {setProgress((prevProgress) => ({...prevProgress, isShow: true}))}

  const startProgress = () => {setProgress((prevProgress) => ({...prevProgress, isRunning: true}));};

  const stopProgress = () => {setProgress((prevProgress) => ({...prevProgress, isRunning: false}));};

  const resetProgress = () => {setProgress(() => ({isShow: false, isRunning: false, status : "", percent: 0}));};

  // Save the timer state to local storage whenever it changes
  useEffect(() => {saveProgressInfo(progress);}, [progress]);

  return { progress, setProgress, showProgress, startProgress, stopProgress, resetProgress };
};
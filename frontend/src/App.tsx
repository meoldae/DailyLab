import ReactDOM from 'react-dom/client';
import AppRouter from "@/router/AppRouter";
import { RecoilRoot } from 'recoil';
import './tailwind.css';
import "@/styles/common/fontImport.css";
import { register } from './serviceWorkerRegistration';

const test = import.meta.env.PROD;
const test2 = import.meta.env.DEV;
console.log("프로덕션환경 : " + test);
console.log("개발환경 : " + test2);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
)

register;
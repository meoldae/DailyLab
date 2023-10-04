import ReactDOM from 'react-dom/client';
import AppRouter from "@/router/AppRouter";
import { CustomToast } from '@/utils/customToast/CustomToast';
import { RecoilRoot } from 'recoil';
import './tailwind.css';
import "@/styles/common/fontImport.css";

// PWA
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <AppRouter />
    <CustomToast />
  </RecoilRoot>
)

// serviceWorkerRegistration.register();
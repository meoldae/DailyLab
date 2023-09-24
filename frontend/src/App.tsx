import ReactDOM from 'react-dom/client';
import AppRouter from "@/router/AppRouter";
import { RecoilRoot } from 'recoil';
import './tailwind.css';
import "@/styles/common/fontImport.css";

// PWA
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
)


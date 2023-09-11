import ReactDOM from 'react-dom/client';
import AppRouter from "@/router/AppRouter";
import { RecoilRoot } from 'recoil';
import "@/resources/css/common/import.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
)
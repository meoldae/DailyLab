import ReactDOM from 'react-dom/client';
import AppRouter from "@/router/AppRouter";
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
)
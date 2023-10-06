import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SetModeToHtml } from "@/atom/modeAtom";
import AuthRoute from "./AuthRoute";
import AppInfo from "@/pages/AppInfo";
import AppMain from "@/pages/AppMain";
import AppSchedule from "@/pages/AppSchedule";
import AppStatistics from "@/pages/AppStatistics";
import AppMyPage from "@/pages/AppMyPage";
import AppLogin from "@/pages/AppLogin";
import AppIntro from "@/pages/AppIntro";
import AppSignUp from "@/pages/AppSignUp";
import AppRedirect from "@/pages/AppRedirect";
import AppNotFound from "@/error/AppNotFound";
import AppLoading from "@/pages/AppLoading";
import AppLogout from "@/pages/AppLogout";
import AppTutorial from "@/pages/AppTutorial";
import { useEffect } from "react";
import { hotjar } from 'react-hotjar';
import ScrollRestoration from "./ScrollRestoration";


const AppRouter = () => {
    useEffect(() => {
        const HJID = Number(import.meta.env.VITE_APP_HOTJAR_ID); 
        const HJSV = Number(import.meta.env.VITE_APP_HOTJAR_SV);
    
        // Check if HJID and HJSV are not NaN (since Number(undefined) results in NaN)
        if (process.env.NODE_ENV !== 'development' && !isNaN(HJID) && !isNaN(HJSV)) {
          hotjar.initialize(HJID, HJSV);
        }
        else {
          console.error("Hotjar ID and Snippet Version must be defined and valid numbers");
        }
      }, []);

    SetModeToHtml();

    return (
        <BrowserRouter>
            <ScrollRestoration />
            <Routes>
                <Route element={<AuthRoute authentication="user"/>}>
                    <Route path="/tutorial" element={<AppTutorial />} />
                    <Route path="/info" element={<AppInfo />} />
                    <Route path="/" element={<AppMain />} />
                    <Route path="/schedule" element={<AppSchedule />} />
                    <Route path="/statistics" element={<AppStatistics />} />
                    <Route path="/mypage" element={<AppMyPage />} />
                    <Route path="/loading" element={<AppLoading />} />
                    <Route path="/logout" element={<AppLogout />} />
                </Route>
                <Route element={<AuthRoute authentication="NotUser"/>}>
                    <Route path="/login" element={<AppLogin />} />
                    <Route path="/oauth2/redirect" element={<AppRedirect />} />
                    <Route path="/memberInfo" element={<AppSignUp />} />
                </Route>
                <Route path="/intro" element={<AppIntro />} />
                <Route path="/*" element={<AppNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
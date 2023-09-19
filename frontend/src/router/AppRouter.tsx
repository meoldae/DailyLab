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
import AppMemberInfo from "@/pages/AppMemberInfo";
import AppRedirect from "@/pages/AppRedirect";
import { SetAccessToken } from "@/atom/UserAtom";

const AppRouter = () => {
    SetModeToHtml();
    SetAccessToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwicHJvdmlkZXIiOiJrYWthbyIsImV4cCI6MTY5NTE3NDU3OCwiaWF0IjoxNjk1MDg4MTc4LCJtZW1iZXJJZCI6IjIifQ.sc-c4O4ODkTWSij8E-cxIQp9ICyzyTDu8Q-bvBV4sPfaG9W702mwaYuvuD6g79eQWF-Hp8J1nBHQ_5FH57UJtg");

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthRoute authentication="user"/>}>
                    <Route path="/info" element={<AppInfo />} />
                    <Route path="/" element={<AppMain />} />
                    <Route path="/schedule" element={<AppSchedule />} />
                    <Route path="/statistics" element={<AppStatistics />} />
                    <Route path="/mypage" element={<AppMyPage />} />
                </Route>
                <Route element={<AuthRoute authentication="NotUser"/>}>    
                    <Route path="/login" element={<AppLogin />} />
                    <Route path="/oauth2/redirect" element={<AppRedirect />} />
                </Route>
                <Route path="/intro" element={<AppIntro />} />
                <Route path="/memberInfo" element={<AppMemberInfo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
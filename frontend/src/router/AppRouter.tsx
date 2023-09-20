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
//import { SetAccessToken } from "@/atom/UserAtom";

const AppRouter = () => {
    SetModeToHtml();
    //SetAccessToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwicHJvdmlkZXIiOiJrYWthbyIsImV4cCI6MTY5NTI1NzI0NSwiaWF0IjoxNjk1MTcwODQ1LCJtZW1iZXJJZCI6IjIifQ.nkHoxGGugVdkGxo-v2Am3d0RaUgplyI7AXiX1TScY5a_5k8WdcBUBkIFRQ87RIl-DP5gKsxRpJFQ7ge-0H-4Zg");

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
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
import AppEmotion from "@/pages/AppEmotion";
// import { SetAccessToken } from "@/atom/UserAtom";

const AppRouter = () => {
    SetModeToHtml();
    // SetAccessToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwicHJvdmlkZXIiOiJrYWthbyIsImV4cCI6MTY5NTQ0NTg0OCwiaWF0IjoxNjk1MzU5NDQ4LCJtZW1iZXJJZCI6IjExIn0.2RQZ3MCePhJYcMtqR6b0OdgWslbPU7d6gCFs5zr626C2i60adFtPAHrJb8WUKUDcGQAGonMQO2DTCEdh3jhnFw");

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthRoute authentication="user"/>}>
                    <Route path="/info" element={<AppInfo />} />
                    <Route path="/" element={<AppMain />} />
                    <Route path="/schedule" element={<AppSchedule />} />
                    <Route path="/statistics" element={<AppStatistics />} />
                    <Route path="/mypage" element={<AppMyPage />} />
                    <Route path="/loading" element={<AppLoading />} />
                    <Route path="/emotion" element={<AppEmotion/>}/>
                </Route>
                <Route element={<AuthRoute authentication="NotUser"/>}>    
                    <Route path="/login" element={<AppLogin />} />
                    <Route path="/oauth2/redirect" element={<AppRedirect />} />
                </Route>
                <Route path="/intro" element={<AppIntro />} />
                <Route path="/memberInfo" element={<AppSignUp />} />
                <Route path="/*" element={<AppNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
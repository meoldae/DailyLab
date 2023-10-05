import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AppMain from "@/pages/AppMain";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthRoute authentication="NotUser"/>}>
                    <Route path="/" element={<AppMain />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
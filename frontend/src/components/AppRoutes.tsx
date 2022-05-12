import React, {Fragment} from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import CallPage from "./HomePage/CallPage";
import ArticlePage from "./ClientSide/Article/ArticlePage";
import ClientHomePage from "./ClientSide/ClientHome/ClientHomePage";
import ArticlesPage from "./ClientSide/Article/ArticlesPage";
import Programs from "./Program/Programs";
import ProgramPage from "./ClientSide/Programs/ProgramPage";

/* Coach Side */
import CoachHome from "./CoachSide/CoachHomePage";

const AppRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CallPage />} />
                    <Route path="/home/" element={<ClientHomePage />} />
                    <Route path="/articles/" element={<ArticlesPage />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/article/:id" element={<ArticlePage/>} />
                    <Route path="/program/:id" element={<ProgramPage/>} />
                    <Route path="/mySpace" element={<CoachHome/>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default AppRoutes;
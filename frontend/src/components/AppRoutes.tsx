import React, {Fragment} from 'react';
import {UserContext} from "./UserContext";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Protected from "./Protected";

import CallPage from "./HomePage/CallPage";
import ArticlePage from "./ClientSide/Article/ArticlePage";
import ClientHomePage from "./ClientSide/ClientHome/ClientHomePage";
import ArticlesPage from "./ClientSide/Article/ArticlesPage";
import Programs from "./Program/Programs";
import ProgramPage from "./ClientSide/Programs/ProgramPage";

import Client from "../types/Client";
/* Coach Side */
import CoachHome from "./CoachSide/CoachHomePage";
import ArticleCreation from "./CoachSide/Article/ArticleCreation"
import ChangeInfos from "./ClientSide/ChangeInfos";
import Creation from "./CoachSide/Program/Creation";
import CoachPresentation from "./ClientSide/CoachPage/CoachPresentation";
import CoachPrivatePage from "./ClientSide/CoachPage/CoachPrivatePage";


const AppRoutes = () => {

    const [user, setUser] = React.useState(null);

    return (
        <Fragment>
            <UserContext.Provider value={{user,setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CallPage />} />
                    <Route path='/home/'
                           element={
                               <Protected isLoggedIn={user !== null}>
                                   <ClientHomePage />
                               </Protected>
                           }
                    />
                    <Route path="/articles/" element={
                        <Protected isLoggedIn={user !== null}>
                            <ArticlesPage />
                        </Protected>
                    } />
                    <Route path="/programs" element={
                        <Protected isLoggedIn={user !== null}>
                            <Programs />
                        </Protected>
                    } />
                    <Route path="/Profile" element={
                        <Protected isLoggedIn={user !== null}>
                            <ChangeInfos />
                        </Protected>
                    } />
                    <Route path="/article/:id" element={
                        <Protected isLoggedIn={user !== null}>
                            <ArticlePage />
                        </Protected>
                    } />
                    <Route path="/program/:id"element={
                        <Protected isLoggedIn={user !== null}>
                            <ProgramPage />
                        </Protected>
                    } />
                    <Route path='/coaches/'
                           element={
                               <Protected isLoggedIn={user !== null}>
                                   <CoachPresentation />
                               </Protected>
                           }
                    />
                    <Route path="/coach/:id"element={
                        <Protected isLoggedIn={user !== null}>
                            <CoachPrivatePage />
                        </Protected>
                    } />
                    {/* Coach Routes*/}
                    <Route path="/myspace" element={
                        <Protected isLoggedIn={user !== null}>
                            <CoachHome />
                        </Protected>
                    } />
                    <Route path="/newarticle" element={
                        <Protected isLoggedIn={user !== null}>
                            <ArticleCreation />
                        </Protected>
                    } />
                    <Route path="/newprogram" element={
                        <Protected isLoggedIn={user !== null}>
                            <Creation />
                        </Protected>
                    } />
                </Routes>
            </BrowserRouter>
            </UserContext.Provider>
        </Fragment>
    );
};

export default AppRoutes;
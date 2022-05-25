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

/* Coach Side */
import CoachHome from "./CoachSide/CoachHomePage";
import ArticleCreation from "./CoachSide/Article/ArticleCreation"
import ChangeInfos from "./ClientSide/ChangeInfos";
import Creation from "./CoachSide/Program/Creation";


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
                    {/*
                    <Route path="/home/" element={<ClientHomePage />} />
                    */}
                    <Route path="/articles/" element={<ArticlesPage />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/Profile" element={<ChangeInfos />} />
                    <Route path="/article/:id" element={<ArticlePage/>} />
                    <Route path="/program/:id" element={<ProgramPage/>} />
                    {/* Coach Routes*/}
                    <Route path="/myspace" element={<CoachHome/>} />
                    <Route path="/newarticle" element={<ArticleCreation/>} />
                    <Route path="/newprogram" element={<Creation/>} />
                </Routes>
            </BrowserRouter>
            </UserContext.Provider>
        </Fragment>
    );
};

export default AppRoutes;
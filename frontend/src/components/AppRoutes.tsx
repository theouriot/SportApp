import React, {Fragment} from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from './HomePage/Login';
import Register from './HomePage/Register'
import ArticlePage from "./ClientSide/Article/ArticlePage";
import ClientHomePage from "./ClientSide/ClientHome/ClientHomePage";
import ArticlesPage from "./ClientSide/Article/ArticlesPage";

const AppRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home/" element={<ClientHomePage />} />
                    <Route path="/articles/" element={<ArticlesPage />} />
                    <Route path="/home/article/:id" element={<ArticlePage/>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default AppRoutes;
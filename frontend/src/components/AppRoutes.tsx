import React, {Fragment} from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from './HomePage/Login';
import Register from './HomePage/Register'
import ChangeInfos from "./ClientSide/ChangeInfos";
import ArticlePage from "./ClientSide/Article/ArticlePage";
import ArticleBar from "./ClientSide/Article/ArticleBar";

const AppRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home/" element={<ArticleBar />} />
                    <Route path="/articles/" element={<ArticleBar />} />
                    <Route path="/home/article/:id" element={<ArticlePage/>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default AppRoutes;
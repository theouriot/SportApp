import React, {Fragment} from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from './HomePage/Login';
import Register from './HomePage/Register'
import ChangeInfos from "./ClientSide/ChangeInfos";

const AppRoutes = () => {

    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home/infos" element={<ChangeInfos />} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default AppRoutes;
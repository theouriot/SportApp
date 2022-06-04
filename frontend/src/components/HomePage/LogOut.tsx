import * as React from 'react';


import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/AuthService";

import {useUser} from "../context/UserContext";
import {useEffect} from "react";

export default function LogOut() {
    let navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const logout = async () => {
            console.log("dedans")
            await AuthService.logout(user)
                .then((response: any) => {
                    // Redirection to the login/register
                    navigate('/');
                })
                .catch((e: Error) => {
                    console.log("error");
                });
        }

        logout().then( () => "ok");


    }, []);


    return (
        <>
        </>
    );
}
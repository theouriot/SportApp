import http from "../http-common";
import CommentData from "../types/Comment"

const login = async (data: any) => {
    console.log(data)
    const tmp =  await http.post<CommentData>(`/auth/login`, data);
    return  tmp.data
};

const signUpClient = async (data: any) => {
    console.log(data)
    const tmp =  await http.post<any>(`/auth/client/signup`, data);
    return  tmp.data
};

const signUpCoach = async (data: any) => {
    const tmp =  await http.post<any>(`/auth/coach/signup`, data);
    return  tmp.data
};

const AuthService = {
    login,
    signUpCoach,
    signUpClient
};

export default AuthService;

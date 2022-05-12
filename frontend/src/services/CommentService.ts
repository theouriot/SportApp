import http from "../http-common";
import CommentData from "../types/Comment"

const getCommentsByArticle = async (id: any) => {
    const tmp = await http.get<Array<CommentData>>(`/comment/byArticle?id=${id}`);
    return tmp.data;
};

const getCommentById = async (id: any) => {
    const tmp = await http.get<CommentData>(`/comment?id=${id}`);
    return tmp.data;
};

const create = async (id: any,data: CommentData) => {
    const tmp =  await http.post<CommentData>(`/comment?id=${id}`, data);
    return  tmp.data
};

const CommentService = {
    getCommentsByArticle,
    getCommentById,
    create
};

export default CommentService;

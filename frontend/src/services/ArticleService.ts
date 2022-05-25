import http from "../http-common";
import ArticleData from "../types/Article";
import ArticleCreation from "../types/ArticleCreation";

const getArticleByID = async (id: any) => {
    const tmp = await http.get<ArticleData>(`/article?id=${id}`);
    return tmp.data;
};

const create = async (data: ArticleCreation) => {
    const tmp =  await http.post<ArticleData>("/article", data);
    return  tmp.data;
};

const getAllArticles = async () => {
    const tmp = await http.get<Array<ArticleData>>("/article/all");
    return tmp.data;
};

const getAllArticlesByCoach = async (id: any) => {
    const tmp = await http.get<Array<ArticleData>>(`/article/byCoach?id=${id}`);
    return tmp.data;
};


const remove = async (id: any) => {
    const tmp = await http.delete<any>(`/article/?id=${id}`);
    return tmp.data;
};

const addView = async (id: any) => {
    const tmp = await http.put<any>(`/article/addView?id=${id}`);
    return tmp.data;
}

const ArticleService = {
    create,
    getAllArticles,
    getAllArticlesByCoach,
    remove,
    getArticleByID,
    addView,
};

export default ArticleService;

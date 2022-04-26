import http from "../http-common";
import ArticleData from "../types/Article";

const getArticleByID = async (id: any) => {
    const tmp = await http.get<ArticleData>(`/article?id=${id}`);
    return tmp.data;
};

const create = async (data: ArticleData) => {
    const tmp =  await http.post<ArticleData>("/article", data);
    return  tmp.data;
};

const getAllArticles = async () => {
    const tmp = await http.get<Array<ArticleData>>("/article/all");
    return tmp.data;
};

const remove = async (id: any) => {
    const tmp = await http.delete<any>(`/article/?id=${id}`);
    return tmp.data;
};

const ArticleService = {
    create,
    getAllArticles,
    remove,
    getArticleByID

};

export default ArticleService;

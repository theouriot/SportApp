import http from "../http-common";
import ArticleData from "../types/Article";


const create = async (data: ArticleData) => {
    const tmp =  await http.post<ArticleData>("/article", data);
    return  tmp.data;
};


const ArticleService = {
    create
};

export default ArticleService;

import React from "react";
import {useEffect, useState} from "react";

import ArticleService from "../../../services/ArticleService";
import Article from "../../../types/Article"
import {useParams} from "react-router-dom";
import ClientNavbarLayout from "../ClientNavbarLayout";


const ArticlePage: React.FC = () => {

    const [article, setArticle] = useState<Article>();
    const props = useParams();

    useEffect(() => {
        const getArticleByID = async (id: any) => {
            await ArticleService.getArticleByID(id)
                .then((response: any) => {
                    setArticle(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getArticleByID(props.id).then( () => "ok");
    }, [props.id]);

    return (
        <div>
            <ClientNavbarLayout />
            <br/>
            <br/>
            <br/>
            <br/>
           <body>
                <h1>{article?.name}</h1>
                <h2>by {article?.author}</h2>
                <h3>Description: {article?.description}</h3>
                <p>{article?.content}</p>
                <h5>Views: {article?.viewCount} Likes: {article?.viewCount}</h5>
           </body>
        </div>
    );
};

export default ArticlePage;


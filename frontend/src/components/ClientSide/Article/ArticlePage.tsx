import React from "react";
import {useEffect, useState} from "react";

import ArticleService from "../../../services/ArticleService";
import Article from "../../../types/Article"

import CommentService from "../../../services/CommentService";
import Comment from "../../../types/Comment";

import {useParams} from "react-router-dom";
import {useUser} from "../../UserContext";

import ClientNavbarLayout from "../ClientNavbarLayout";
import { Box, Button, TextField} from "@mui/material";
import ListComment from "./ListComment";
import Typography from "@mui/material/Typography";

const ArticlePage: React.FC = () => {

    const defaultArticle = new Article(0,"",0,"","","");
    const [article, setArticle] = useState<Article>(defaultArticle);
    const props = useParams();
    const [value, setValue] = useState("");
    const [update,setUpdate] = useState<number>(0);

    const { user } = useUser();

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

        const addView = async (id: any) => {
            await ArticleService.addView(id)
                .then((response: any) => {
                    console.log("view added")
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getArticleByID(props.id).then( () => "ok");
        addView(props.id).then( () => "ok");

    }, [props.id]);


    const callCreate = async () => {
        let comment;
        if(user?._id !== null){
            comment = new Comment(null,user?._id,value)
        }
        else{
            comment = new Comment(null,"627bef6ceb76f4306281802b",value)
        }
        if (value !== ""){
            console.log(comment);
            await createComment(article?._id, comment);
            setUpdate(update+1);
        }
    };

    const createComment = async (id: any, data: Comment) => {
        console.log("comment send ! ");
        await CommentService.create(id,data)
            .then((response: any) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    return (
        <div style={{ marginLeft: '20%', marginRight: '20%'
        }}>
            <ClientNavbarLayout />
            <br/>
            <br/>
            <br/>
            <br/>
            <Typography variant="h5"  sx={{ fontWeight: 'bold' }} >{article.name}</Typography>
            <Box sx={{ fontWeight: 'Light' }}>{article?.author}</Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>About what is talking this article ?</Typography>
            <Typography variant="h6">{article?.description}</Typography>
            <Box sx={{ fontWeight: 'regular' }}>{article?.content}</Box>
                <h5>Views: {article?.viewCount} Likes: {article?.likeCount} <Button variant="text">Like</Button></h5>
            <h2>Comments</h2>
            <TextField fullWidth label="Enter you comment" id="fullWidth"
                       value={value}
                       onChange={(e) => {
                           setValue(e.target.value);
                       }}
            />
            <Button variant="contained" onClick={callCreate}>Validate</Button>
            <ListComment idArticle={article?._id}  update={update}/>
        </div>
    );
};

export default ArticlePage;




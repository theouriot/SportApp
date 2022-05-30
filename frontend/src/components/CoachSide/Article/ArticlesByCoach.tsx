import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import ArticleService from "../../../services/ArticleService";
import Article from "../../../types/Article"

import Card from '@mui/material/Card';
import {Avatar, CardHeader, CardMedia, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import {useUser} from "../../UserContext";

interface Props{
    coachId: string | undefined;
}
const ArticleBar: React.FC<Props> = (props) => {
    const [articles, setArticles] = useState<Array<Article>>([]);
    const { user } = useUser();
    useEffect(() => {
        const getAllArticles = async () => {
            if(props.coachId !== undefined){
                console.log(props.coachId)
                await ArticleService.getAllArticlesByCoach(props.coachId)
                    .then((response: any) => {
                        console.log(response)
                        setArticles(response);
                        console.log(articles)
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            }
            else{
                await ArticleService.getAllArticlesByCoach(user?._id)
                    .then((response: any) => {
                        setArticles(response);
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            }
        };
        getAllArticles();
    }, []);
    return (
        <>
            <Grid container spacing={1}>
                {articles &&
                articles.map((article,index) => (
                    <Fragment key={index}>
                        <Grid item xs={4}>
                            <Link to={"/article/"+ article._id} key={index} style={{textDecoration:"none" }}>
                                <Card sx={{ width: 400,borderRadius: "20px" }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe">
                                                R
                                            </Avatar>
                                        }
                                        title={article.name}
                                        subheader={article.description}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={require('../../../images/articles/article2.jpg')} // require image
                                        alt="descriptive image"
                                    />
                                </Card>
                            </Link>
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
        </>
    );
};

export default ArticleBar;


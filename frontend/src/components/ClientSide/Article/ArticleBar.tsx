import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import ArticleService from "../../../services/ArticleService";
import Article from "../../../types/Article"

import Card from '@mui/material/Card';
import {Avatar, CardHeader, CardMedia, Fade, Grid, Grow} from "@mui/material";
import { Link } from "react-router-dom";


const ArticleBar: React.FC = () => {
    const [articles, setArticles] = useState<Array<Article>>([]);

    useEffect(() => {
        const getAllArticles = async () => {
            await ArticleService.getAllArticles()
                .then((response: any) => {
                    setArticles(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getAllArticles();
    }, []);
    return (
        <>
            <Grid container spacing={1}>
            {articles.slice(0,6).map((article,index) => (
                <Fragment key={index}>
                    <Grid item xs={4}>
                        <Link to={"/article/"+ article._id} key={index} style={{textDecoration:"none" }}>
                            <Grow in={true} timeout={2000}>
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
                            </Grow>
                        </Link>
                    </Grid>
                </Fragment>
            ))}
            </Grid>
        </>
    );
};

export default ArticleBar;


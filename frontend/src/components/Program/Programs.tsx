import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import Card from '@mui/material/Card';
import {Avatar, CardHeader, CardMedia, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import Article from "../../types/Article";
import ArticleService from "../../services/ArticleService";
import ClientNavbarLayout from "../ClientSide/ClientNavbarLayout";


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
            <ClientNavbarLayout />
            <br/>
            <br/>
            <br/>
            <br/>
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
                                        title={"Program Exemple"}
                                        subheader={"this is a description"}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={require('./smith.jpg')} // require image
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


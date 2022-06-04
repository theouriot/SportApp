import React from "react";
import {useEffect, useState} from "react";

import ArticleService from "../../../services/ArticleService";
import Article from "../../../types/Article"

import CommentService from "../../../services/CommentService";
import Comment from "../../../types/Comment";

import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../context/UserContext";
import SendIcon from '@mui/icons-material/Send';

import ClientNavbarLayout from "../ClientNavbarLayout";
import {Box, Button, Chip, Stack, Switch, TextField} from "@mui/material";
import ListComment from "./ListComment";
import Typography from "@mui/material/Typography";
import ArticleAuthor from "../../Chip/AuthorArticle"
import Client from "../../../types/Client";
import Coach from "../../../types/Coach";
import DeleteIcon from "@mui/icons-material/Delete";
import CoachNavbarLayout from "../../CoachSide/CoachNavbarLayout";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ArticlePage: React.FC = () => {

    let navigate = useNavigate();

    const defaultArticle = new Article(0,"",0,"","","");
    const [article, setArticle] = useState<Article>(defaultArticle);
    const props = useParams();
    const [value, setValue] = useState("");
    const [update,setUpdate] = useState<number>(0);

    const [visible, setVisible] = useState(false);

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
            await createComment(article?._id, comment);
            setUpdate(update+1);
        }
    };

    const createComment = async (id: any, data: Comment) => {
        await CommentService.create(id,data)
            .then((response: any) => {

            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteArticle = async () => {
        await ArticleService.remove(article._id)
            .then((response: any) => {
                if(user instanceof Client){
                    navigate("/home")
                }
                else{
                    navigate("/myspace")
                }
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    var component;
    if (user instanceof Coach) {
        component = <>
                        <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteArticle}>
                            Delete
                        </Button>
                    </>;
    } else {
        component = <>{visible
            ? <><ListComment idArticle={article?._id}  update={update}/>
                <h2>Comments</h2>
                <Stack direction="row" gap={"10%"}>
                    <TextField fullWidth label="Enter you comment" id="fullWidth"
                               value={value}
                               onChange={(e) => {
                                   setValue(e.target.value);
                               }}
                    />
                    <Button variant="contained" onClick={callCreate} sx={{width:"80%"}} endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Stack>
                <Typography variant="h6">Disable comments <Switch defaultChecked onChange={(event) => {setVisible(event.target.checked)}}></Switch></Typography>
            </>
            : <Typography variant="h6">Enable comments <Switch  onChange={(event) => {setVisible(event.target.checked)}}></Switch></Typography>
        }</>;
    }

    return (
        <Typography style={{ marginLeft: '20%', marginRight: '20%'
        }}>
            {user instanceof Client
            ? <ClientNavbarLayout />
            : <CoachNavbarLayout />
            }
            <br/>
            <br/>
            <br/>
            <br/>
            <Typography variant="h5"  sx={{ fontWeight: 'bold' }} >{article.name}</Typography>
            <Box sx={{ fontWeight: 'Light' }}>By <ArticleAuthor id={article.author}/></Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>About what is talking this article ?</Typography>
            <Typography variant="h6">{article?.description}</Typography>
            <Box sx={{ fontWeight: 'regular' }}>{article?.content}</Box>
            <Chip icon={<RemoveRedEyeIcon />} label={article.viewCount} variant="outlined" />
            {component}
        </Typography>
    );
};

export default ArticlePage;




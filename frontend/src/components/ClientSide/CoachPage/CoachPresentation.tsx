import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import ArticleService from "../../../services/ArticleService";
import Article from "../../../types/Article"

import Card from '@mui/material/Card';
import {
    Avatar,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import { Link } from "react-router-dom";
import FaceIcon from '@mui/icons-material/Face';
import CoachService from "../../../services/CoachService";
import Coach from "../../../types/Coach";
import ClientNavbarLayout from "../ClientNavbarLayout";
import ImageIcon from '@mui/icons-material/Image';


const CoachPresentation: React.FC = () => {
    const [coaches, setCoaches] = useState<Array<Coach>>([]);

    useEffect(() => {
        const getAllArticles = async () => {
            await CoachService.getAllCoaches()
                .then((response: any) => {
                    setCoaches(response);
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
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    marginLeft: '30%',
                }}
            >
                {coaches.slice(0,6).map((coach,index) => (
                    <Fragment key={index}>
                        <Link to={"/coach/"+ coach._id} key={index} style={{textDecoration:"none" }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FaceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={coach.alias} secondary={coach.email} />
                            </ListItem>
                        </Link>
                    <Divider variant="inset" component="li" />
                    </Fragment>
                ))}
            </List>
        </>
    );
};

export default CoachPresentation;


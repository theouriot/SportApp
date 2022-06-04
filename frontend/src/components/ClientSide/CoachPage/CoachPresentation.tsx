import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import {
    Avatar,
    Divider,
    Grow,
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
                            <Grow in={true} timeout={3000}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FaceIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={coach.alias} secondary={coach.email} />
                                </ListItem>
                            </Grow>
                        </Link>
                    <Divider variant="inset" component="li" />
                    </Fragment>
                ))}
            </List>
        </>
    );
};

export default CoachPresentation;


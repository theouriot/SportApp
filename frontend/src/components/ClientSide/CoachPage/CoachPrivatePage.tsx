import React from "react";
import {useEffect, useState} from "react";

import {useParams} from "react-router-dom";

import ClientNavbarLayout from "../ClientNavbarLayout";
import {Avatar, CardContent, CardHeader, Chip, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArticlesByCoach from "../../CoachSide/Article/ArticlesByCoach";
import ProgramsByCoach from "../../CoachSide/Program/ProgramsByCoach";
import Coach from "../../../types/Coach";
import CoachService from "../../../services/CoachService";
import Card from "@mui/material/Card";

const CoachPrivatePage: React.FC = () => {
    const props = useParams();

    const [coach, setCoach] = useState<Coach>();

    useEffect(() => {
        const getCoachByID = async (id: any) => {
            await CoachService.getCoachByID(id)
                .then((response: any) => {
                    setCoach(response)
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getCoachByID(props.id).then( () => "ok");


    }, [props.id]);


    return (
        <>
            <ClientNavbarLayout />
            <br/>
            <br/>
            <br/>
            <br/>
            <Card sx={{ width: 400,borderRadius: "20px" }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={coach?.alias}
                    subheader={coach?.email}
                />
                <CardContent>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={" programs"}
                            variant="outlined"
                        />
                        <Chip
                            label={ " articles"}
                        />
                    </Stack>
                </CardContent>
            </Card>
            <Typography variant="h5">{coach?.alias}'s Articles</Typography>
            <ArticlesByCoach coachId={props.id}></ArticlesByCoach>
            <Typography variant="h5">{coach?.alias}'s Programs</Typography>
            <ProgramsByCoach coachId={props.id}></ProgramsByCoach>
        </>
    );
};

export default CoachPrivatePage;




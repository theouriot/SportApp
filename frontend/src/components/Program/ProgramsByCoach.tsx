import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import Program from "../../types/Program"

import Card from '@mui/material/Card';
import {Avatar, CardContent, CardHeader, CardMedia, Chip, Grid, Grow, Stack} from "@mui/material";
import { Link } from "react-router-dom";
import {useUser} from "../context/UserContext";
import ProgramService from "../../services/ProgramService";
import CatChip from "../Chip/CatChip";
import LevelChip from "../Chip/LevelChip";

interface Props{
    coachId: string | undefined;
}

const ProgramByCoach: React.FC<Props> = (props) => {
    const [programs, setPrograms] = useState<Array<Program>>([]);
    const { user } = useUser();
    useEffect(() => {
        const getAllPrograms = async () => {
            if(props.coachId !== undefined){
                await ProgramService.getAllProgramsByCoach(props.coachId)
                    .then((response: any) => {
                        setPrograms(response);
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            }
            else{
                await ProgramService.getAllProgramsByCoach(user?._id)
                    .then((response: any) => {
                        setPrograms(response);
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            }
        };
        getAllPrograms().then(r => "ok");
    }, [props.coachId]);
    return (
        <>
            <Grid container spacing={1}>
                {programs &&
                programs.map((program,index) => (
                    <Fragment key={index}>
                        <Grid item xs={4}>
                            <Link to={"/program/"+ program._id} key={index} style={{textDecoration:"none" }}>
                                <Grow in={true} timeout={2000}>
                                    <Card sx={{ width: 400,borderRadius: "20px" }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe">
                                                    R
                                                </Avatar>
                                            }
                                            title={program.name}
                                            subheader={program.description}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={require('../../images/homePageImage.jpg')} // require image
                                            alt="descriptive image"
                                        />
                                        <CardContent>
                                            <Stack direction="row" spacing={1}>
                                                <CatChip id={program.idCategory}/>
                                                <LevelChip id={program.idLevel}/>
                                                <Chip
                                                    label={program.viewCount + " views"}
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={program.likeCount + " likes"}
                                                />
                                            </Stack>
                                        </CardContent>
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

export default ProgramByCoach;


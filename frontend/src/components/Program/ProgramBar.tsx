import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import ProgramService from "../../services/ProgramService";
import Program from "../../types/Program";

import Card from '@mui/material/Card';
import {Avatar, CardContent, CardHeader, CardMedia, Chip, Grid, Grow, Stack} from "@mui/material";
import { Link } from "react-router-dom";
import CatChip from "../Chip/CatChip";
import LevelChip from "../Chip/LevelChip";


const ProgramBar: React.FC = () => {
    const [programs, setPrograms] = useState<Array<Program>>([]);

    useEffect(() => {
        const getAllArticles = async () => {
            await ProgramService.getAllPrograms()
                .then((response: any) => {
                    setPrograms(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getAllArticles().then(() => "ok");
    }, []);
    return (
        <>
            <Grid container spacing={1}>
                {programs.slice(0,6).map((program,index) => (
                    <Fragment key={index}>
                        <Grid item xs={4}>
                            <Link to={"/program/"+ program._id} key={index} style={{textDecoration:"none" }}>
                                <Grow in={true} timeout={3000}>
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

export default ProgramBar;


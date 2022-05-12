import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import ProgramService from "../../../services/ProgramService";
import Program from "../../../types/Program";

import Card from '@mui/material/Card';
import {Avatar, CardHeader, CardMedia, Grid} from "@mui/material";
import { Link } from "react-router-dom";


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
                {programs &&
                programs.map((program,index) => (
                    <Fragment key={index}>
                        <Grid item xs={4}>
                            <Link to={"/program/"+ program._id} key={index} style={{textDecoration:"none" }}>
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
                                </Card>
                            </Link>
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
        </>
    );
};

export default ProgramBar;


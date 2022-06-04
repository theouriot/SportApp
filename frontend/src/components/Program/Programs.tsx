import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import {
    Autocomplete,
    Avatar,
    Box,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Grid, Grow,
    Stack,
    TextField,
    Card
} from "@mui/material";
import { Link } from "react-router-dom";
import ClientNavbarLayout from "../ClientSide/ClientNavbarLayout";

import Data from "../../types/Data";
import Program from "../../types/Program";

import CatProgramService from "../../services/CatProgram";
import LevelService from "../../services/LevelService";
import ProgramService from "../../services/ProgramService";

import LevelChip from "../Chip/LevelChip";
import CatChip from "../Chip/CatChip";


const ArticleBar: React.FC = () => {
    const [programs, setPrograms] = useState<Array<Program>>([]);
    const [catPrograms, setCatPrograms] = useState<Array<Data>>([]);
    const [levels, setLevels] = useState<Array<Data>>([]);
    const [searchLevel,setSearchLevel] = useState<Array<Data>>([]);
    const [searchCat,setSearchCat] = useState<Array<Data>>([]);

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

        const getCatPrograms = async () => {
            await CatProgramService.getAllCatsProgram()
                .then((response: any) => {
                    setCatPrograms(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        const getLevels = async () => {
            await LevelService.getAllLevels()
                .then((response: any) => {
                    setLevels(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getCatPrograms().then( () => "ok");
        getLevels().then( () => "ok");
        getAllArticles().then( () => "ok");

    }, []);

    const handleLevel = (event: any,value: any ) => {
        setSearchLevel(value);
        console.log(searchLevel)
    };

    const handleCat = (event: any,value: any ) => {
        setSearchCat(value);
        console.log(searchCat)
    };

    return (
        <>
            <ClientNavbarLayout />
            <br/>
            <br/>
            <br/>
            <br/>
            <Stack direction="row" gap={"20%"}>
            <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={catPrograms}
                defaultValue={catPrograms}
                getOptionLabel={(cat) => cat.name}
                renderInput={(params) => (
                    <TextField {...params} label="Filter by Category" placeholder="" />
                )}
                onChange={handleCat}
                sx={{ width: '500px' }}
            />
            <Autocomplete
                limitTags={3}
                multiple
                id="multiple-limit-tags"
                options={levels}
                getOptionLabel={(level) => level.name}
                renderInput={(params) => (
                    <TextField {...params} label="Filter by Level" placeholder="" />
                )}
                onChange={handleLevel}
                sx={{ width: '500px' }}
            />
            </Stack>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {programs.filter((program) => {
                    // Case where everything is unchecked
                    if(searchLevel.length === 0 && searchCat.length ===0){
                        return program
                    }
                    // Case where levels are unchecked
                    else if(searchCat.length !==0 && searchLevel.length === 0) {
                            for(let i=0; i<searchCat.length; i++){
                                if(program.idCategory === searchCat[i]._id){
                                    return program;
                                }
                            }
                    }
                    // Case where categories are unchecked
                    else if(searchLevel.length !==0 && searchCat.length === 0) {
                        for(let i=0; i<searchLevel.length; i++){
                            if(program.idLevel === searchLevel[i]._id){
                                return program;
                            }
                        }
                    }
                    // Cross case
                    else {
                        for(let i=0; i<searchLevel.length; i++){
                            for(let i=0; i<searchCat.length; i++){
                                if(program.idLevel === searchLevel[i]._id && program.idCategory === searchCat[i]._id){
                                    return program;
                                }
                            }
                        }
                        }
                    }

                ).map((program,index) => (
                    <Fragment key={index}>
                        <Grid item xs={2} sm={4} md={4} key={index}>
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
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
            </Box>
        </>
    );
};

export default ArticleBar;


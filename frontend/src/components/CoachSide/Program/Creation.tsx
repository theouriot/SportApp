import * as React from 'react';
import CoachNavbarLayout from "../CoachNavbarLayout";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Step,
    StepLabel,
    Stepper, TextareaAutosize,
    Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import ArticleService from "../../../services/ArticleService";
import CatProgramService from "../../../services/CatProgram";
import Article from "../../../types/Article";
import Data from "../../../types/Data";
import LevelService from "../../../services/LevelService";
import StepCreation from "./StepCreation";

const steps = [
    'Program Informations',
    'Add different steps',
];

export default function Creation() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [catPrograms, setCatPrograms] = useState<Array<Data>>([]);
    const [levels, setLevels] = useState<Array<Data>>([]);

    const [programName, setProgramName] = React.useState('');
    const [selectedCat, setSelectedCat] = React.useState('');
    const [selectedLevel, setSelectedLevel] = React.useState('');
    const [programDescription, setProgramDescription] = React.useState('');

    const handleChangeName = (event: any) => {
        setProgramName(event.target.value as string);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCat(event.target.value as string);
    };

    const handleChangeLevel = (event: SelectChangeEvent) => {
        setSelectedLevel(event.target.value as string);
    };

    const handleChangeDescription = (event: any) => {
        setProgramDescription(event.target.value as string);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        console.log("aa");
    }

    useEffect(() => {
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

    }, []);

    return (
        <>
            <CoachNavbarLayout></CoachNavbarLayout>
            <br/>
            <br/>
            <br/>
            <br/>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>

                            {activeStep === 0
                                ? <>{/* Program part */}
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <Typography variant="h5">
                                           Enter all the program infos
                                        </Typography>
                                        <Typography variant="body2">
                                            Program name
                                        </Typography>
                                        <TextField
                                            margin="normal"
                                            required
                                            id="name"
                                            label="Program Name"
                                            name="name"
                                            autoFocus
                                            value={programName}
                                            sx={{ width: "80%", marginLeft:"10%"}}
                                            onChange={handleChangeName}
                                        />
                                        <FormControl fullWidth>
                                            <Typography variant="body2">
                                                Select a category
                                            </Typography>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedCat}
                                                label="Age"
                                                onChange={handleChange}
                                                sx={{ width: "80%", marginLeft:"10%"}}
                                            > { catPrograms &&
                                                catPrograms.map( (catprogram, index) => (
                                                    <MenuItem value={catprogram._id}>{catprogram.name}</MenuItem>
                                                ))}
                                            </Select>
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <Typography variant="body2">
                                                    Select a level
                                                </Typography>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={selectedLevel}
                                                    label="Age"
                                                    onChange={handleChangeLevel}
                                                    sx={{ width: "80%", marginLeft:"10%"}}
                                                >
                                                    {levels &&
                                                        levels.map( (level) => (
                                                            <MenuItem value={level._id}>{level.name}</MenuItem>
                                                        ))}
                                                </Select>
                                                </FormControl>
                                                <p style={{ width: "80%", marginLeft:"10%"}}>
                                                    Write a short description
                                                </p>
                                                <TextareaAutosize
                                                    id="content"
                                                    name="content"
                                                    aria-label="minimum height"
                                                    minRows={3}
                                                    value={programDescription}
                                                    placeholder="Write here ! "
                                                    style={{ width: "80%", marginLeft:"10%"}}
                                                    onChange={handleChangeDescription}
                                                />

                                    </Box>
                                </>
                                : <>{/* Step part */}
                                <StepCreation/>
                                </>
                            }
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} variant="contained">
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>

                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </>
    );
}
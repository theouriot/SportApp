import * as React from 'react';
import CoachNavbarLayout from "../CoachNavbarLayout";
import {
    Box,
    Button, Card, CardContent, FormControl, MenuItem, Select, SelectChangeEvent, Stack,
    Step,
    StepLabel,
    Stepper, TextareaAutosize,
    Typography
} from "@mui/material";

import {useEffect, useRef, useState} from "react";

import TextField from "@mui/material/TextField";
import Data from "../../../types/Data";
import CatProgramService from "../../../services/CatProgram";
import LevelService from "../../../services/LevelService";
import ProgramService from "../../../services/ProgramService";
import Program from "../../../types/ProgramCreation";
import List from "@mui/material/List";
import {TransitionGroup} from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import StepModel from "../../../types/Step"
import StepService from "../../../services/StepService";
const steps = [
    'Program Informations',
    'Add different steps',
];


const FRUITS = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
];

interface Test{
    program: string;
}

export default function Creation() {

    const [activeStep, setActiveStep] = useState(0);
    const [program, setProgram] = useState<Test>();
    const [catPrograms, setCatPrograms] = useState<Array<Data>>([]);
    const [levels, setLevels] = useState<Array<Data>>([]);

    const [programName, setProgramName] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [programDescription, setProgramDescription] = useState('');

    const [fruitsInBasket, setFruitsInBasket] = useState(FRUITS.slice(0,1));

    const [stepDescription] = useState([]);
    const [stepName] = useState([]);
    const [stepSets] = useState([]);
    const [stepReps] = useState([]);
    const [stepTime] = useState([]);

    const handleAddFruit = () => {
        console.log(fruitsInBasket)
        const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
        if (nextHiddenItem) {
            setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
        }
        console.log(fruitsInBasket)
    };

    const handleRemoveFruit = (item: number) => {
        console.log(fruitsInBasket)
        setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
        console.log(fruitsInBasket)
    };

    const addFruitButton = (
        <Button
            variant="contained"
            disabled={fruitsInBasket.length >= 10}
            onClick={handleAddFruit}
        >
            Add fruit to basket
        </Button>
    );

    const handleChangeStepName = (event: any) => {
        const value = event.target.value as string
        if(value.startsWith(stepName[stepName.length-1])){
            // We remove the previous item
            stepName.pop();
            // We add a new one
            // @ts-ignore
            stepName.push(event.target.value as string);
        }
        else{
            // @ts-ignore
            stepName.push(event.target.value as string);
        }
    };

    const handleChangeStepDescription = (event: any) => {
        const description = event.target.value as string
        if(description.startsWith(stepDescription[stepDescription.length-1])){
            // We remove the previous item
            stepDescription.pop();
            // We add a new one
            // @ts-ignore
            stepDescription.push(event.target.value as string);
        }
        else{ // New item case
            // @ts-ignore
            stepDescription.push(event.target.value as string);
        }

    };

    const handleChangeStepSets = (event: any) => {
        // @ts-ignore
        stepSets.push(event.target.value);
    };

    const handleChangeStepReps = (event: any) => {
        // @ts-ignore
        stepReps.push(event.target.value);
    };

    const handleChangeStepTime = (event: any) => {
        // @ts-ignore
        stepTime.push(event.target.value);
    };

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

    const handleSubmit = () => {

    }

    const createProgram = async (data: Program) => {
        await ProgramService.create(data)
            .then((response: any) => {
                console.log(response);
                setProgram(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

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


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if(activeStep === steps.length - 1){
            const programObject = new Program(programName,"627d5c59a954d6948e703363",selectedCat,selectedLevel,programDescription," ");
            createProgram(programObject).then(r => "ok");
            console.log("prog",program);

            for(let i = 0; i< stepName.length ;i++){
                console.log("step name",stepName[i])
                console.log("step description",stepDescription[i])

                const step = new StepModel(stepName[i],i+1," ", stepSets[i],stepReps[i],stepDescription[i],stepTime[i])
                //addStep(program.)
            }
        }
    };

    const addStep = async (id: string, data: StepModel) => {
        await StepService.create(id,data)
            .then((response: any) => {
                return(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <CoachNavbarLayout></CoachNavbarLayout>
            <br/>
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
                                <StepLabel key={index} {...labelProps}>{label}</StepLabel>
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
                                        <Typography variant="body2" sx={{ width: "80%", marginLeft:"10%"}} >
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
                                            <Typography variant="body2" sx={{ width: "80%", marginLeft:"10%"}}>
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
                                                <MenuItem key={index} value={catprogram._id}>{catprogram.name}</MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <Typography variant="body2" sx={{ width: "80%", marginLeft:"10%"}}>
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
                                        <Typography variant="body2" sx={{ width: "80%", marginLeft:"10%"}}>
                                            Write a short description
                                        </Typography>
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
                                : <>
                                    <div>
                                        <br/>
                                        {addFruitButton}
                                        <Box sx={{ mt: 1 }}>
                                            <List>
                                                <TransitionGroup>
                                                    {fruitsInBasket.map((item,index) => (
                                                        <Collapse key={item}>
                                                            <Card sx={{ width: "80%", marginTop: 5}}>
                                                                <CardContent>
                                                                    <Typography variant="h5" component="div">
                                                                        Step {index+1}
                                                                    </Typography>
                                                                    <Typography variant="h5" component="div">
                                                                        <ListItem
                                                                            secondaryAction={
                                                                                <IconButton
                                                                                    edge="end"
                                                                                    aria-label="delete"
                                                                                    title="Delete"
                                                                                    onClick={() => handleRemoveFruit(item)}
                                                                                >
                                                                                    <DeleteIcon />
                                                                                </IconButton>
                                                                            }
                                                                        >
                                                                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                                                                <TextField
                                                                                    margin="normal"
                                                                                    required
                                                                                    id="name"
                                                                                    label="Step Name"
                                                                                    name="name"
                                                                                    autoComplete="name"
                                                                                    autoFocus
                                                                                    onChange={handleChangeStepName}
                                                                                />
                                                                                <TextareaAutosize
                                                                                    id="content"
                                                                                    name="content"
                                                                                    aria-label="minimum height"
                                                                                    minRows={5}
                                                                                    placeholder="Write here ! (or copy and past here) "
                                                                                    style={{ width: '60%' }}
                                                                                    onChange={handleChangeStepDescription}
                                                                                />
                                                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                                                    <TextField
                                                                                        margin="normal"
                                                                                        required
                                                                                        id="sets"
                                                                                        label="Sets"
                                                                                        name="sets"
                                                                                        autoFocus
                                                                                        sx={{ width: "100%"}}
                                                                                        inputProps={{ min: 1, max: 100 }}
                                                                                        type="number"
                                                                                        onChange={handleChangeStepSets}
                                                                                    />
                                                                                    <TextField
                                                                                        margin="normal"
                                                                                        required
                                                                                        id="reps"
                                                                                        label="Reps"
                                                                                        name="reps"
                                                                                        autoFocus
                                                                                        sx={{ width: "100%"}}
                                                                                        inputProps={{ min: 1, max: 100 }}
                                                                                        type="number"
                                                                                        onChange={handleChangeStepReps}
                                                                                    />
                                                                                    <TextField
                                                                                        margin="normal"
                                                                                        required
                                                                                        id="time"
                                                                                        label="Time (in min)"
                                                                                        name="time"
                                                                                        autoFocus
                                                                                        sx={{ width: "120%"}}
                                                                                        inputProps={{ min: 1, max: 100 }}
                                                                                        type="number"
                                                                                        onChange={handleChangeStepTime}
                                                                                    />
                                                                                    <label htmlFor="contained-button-file">
                                                                                        <input
                                                                                            accept="image/*"
                                                                                            id="icon-button-video"
                                                                                            type="file"
                                                                                        />
                                                                                    </label>
                                                                                </Stack>
                                                                            </Box>
                                                                        </ListItem>
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </Collapse>
                                                    ))}
                                                </TransitionGroup>
                                            </List>
                                        </Box>
                                    </div>
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
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import {Card, CardContent, SelectChangeEvent, Stack, TextareaAutosize, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Step from "../../../types/Step";
const FRUITS = [
    '🍏 Apple',
    '🍏 Apple',
    '🍏 Apple',
    '🍏 Apple',
];

const Steps: any[] = [];


const TransitionGroupExample: React.FC = () => {

    const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS);


    useEffect(() => {
        const stepCreation = async () => {
            //const step = new Step(stepName,stepNumber,"",stepSets,stepReps,stepDescription,stepTime);
            //if(step.name !== ""){
            //addStep(step);
            //}
        };
        stepCreation().then( () => "ok");

    }, []);


    const handleAddFruit = () => {
        const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
        if (nextHiddenItem) {
            setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
        }
    };


    const handleRemoveFruit = (item: string) => {
        setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
    };

    const addFruitButton = (
        <Button
            variant="contained"
            onClick={handleAddFruit}
        >
            Add step
        </Button>
    );

    return (
        <div>
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
                                                    />
                                                    <TextareaAutosize
                                                        id="content"
                                                        name="content"
                                                        aria-label="minimum height"
                                                        minRows={5}
                                                        placeholder="Write here ! (or copy and past here) "
                                                        style={{ width: '60%' }}
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
    );
}

export default TransitionGroupExample;


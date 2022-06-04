import React, {Fragment, useRef} from "react";
import {useEffect, useState} from "react";

import ProgramService from "../../services/ProgramService";
import Program from "../../types/Program";
import Step from "../../types/Step";

import {useNavigate, useParams} from "react-router-dom";
import ClientNavbarLayout from "../ClientSide/ClientNavbarLayout";
import {Button, Chip, Stack} from "@mui/material";

import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import CatChip from "../Chip/CatChip";
import LevelChip from "../Chip/LevelChip";
import CoachChip from "../Chip/CreatorChip"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {useUser} from "../context/UserContext";
import Client from "../../types/Client"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CoachNavbarLayout from "../CoachSide/CoachNavbarLayout";
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ProgramPage: React.FC = () => {
    const defaultStep = new Step("",0,"",0,0,"",0)
    const defaultProgram = new Program(0,"",0,0,0,"",[defaultStep],"")
    const [program, setProgram] = useState<Program>(defaultProgram);
    const props = useParams();
    var totalRecommandedTime = 0;
    let navigate = useNavigate();

    const { user } = useUser();
    const [hasLiked, setHasLiked] = useState<number>(0);
    const [change, setChange] = useState<number>(0);

    useEffect(() => {
        const getProgramByID = async (id: any) => {
            await ProgramService.getProgramByID(id)
                .then((response: any) => {
                    setProgram(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        const addView = async (id: any) => {
            await ProgramService.addView(id)
                .then((response: any) => {
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        const hasAlreadyLikedTheProgram = async (id: any,idClient: any) => {
                await ProgramService.hasAlreadyLiked(id,idClient)
                    .then((response: any) => {
                        if(response.data){
                            setLike()
                        }
                        return null;
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
        };

        getProgramByID(props.id).then( () => "ok");
        addView(props.id).then( () => "ok");
        hasAlreadyLikedTheProgram(props.id,user?._id).then( () => "ok");

    }, [change]);

    const getTotalRecommandedTime = () => {
        program.steps?.forEach(step =>
            totalRecommandedTime+= step.recommandedTime
        )
        return totalRecommandedTime
    }

    const setLike = async () => {
        setHasLiked(state => (state + 1));
    }

    const setDislike = async () => {
        setHasLiked(0);
    }

    const addLike = async () => {
        await ProgramService.addLike(program._id,user?._id)
            .then((response: any) => {
                console.log(response);
                if(response){
                    setLike();
                }
                console.log(hasLiked)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const callLike = () => {
        addLike().then(r => setChange(state => (state + 1)));
    }

    const addDislike = async () => {
        await ProgramService.addDislike(program._id,user?._id)
            .then((response: any) => {
                console.log(response);
                if(response){
                    setDislike();
                }
                console.log(hasLiked)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const callDislike = () => {
        addDislike().then(r => setChange(state => (state + 1)));
    }

    const deleteAction = () =>{
        deleteProgram().then(r => "ok");
    }

    const deleteProgram = async () => {
        await ProgramService.remove(program._id)
            .then((response: any) => {
                if(user instanceof Client){
                    navigate("/home")
                }
                else{
                    navigate("/myspace")
                }
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
        <div style={{ marginLeft: '15%', marginRight: '15%'
        }}>
            {user instanceof Client
                ? <ClientNavbarLayout/>
                : <CoachNavbarLayout/>
            }
                <>

                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Typography variant="h5"  sx={{ fontWeight: 'bold', textAlign: "center" }} >{program.name}</Typography>
                        <br/>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Informations</Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label={getTotalRecommandedTime() +"min"} color="primary"/>
                            <LevelChip id={program.idLevel}/>
                            <CatChip id={program.idCategory}/>
                            <CoachChip id={program.creator}/>
                            <Chip icon={<RemoveRedEyeIcon />} label={program.viewCount} variant="outlined" />
                        </Stack>
                        <br/>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>What is the purpose of this program ?</Typography>
                            <Typography variant="h6">{program.description}</Typography>
                        <br/>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Different steps you need to follow</Typography>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: '70%', tableLayout: 'fixed' }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                        <StyledTableCell>Step</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell align="right">Number of Sets</StyledTableCell>
                        <StyledTableCell align="right">Number of Reps</StyledTableCell>
                        <StyledTableCell align="right">Recommanded Time</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                    {program.steps &&
                        program.steps.map((step,index) => (
                        <Fragment key={index}>
                        <StyledTableRow key={step.name}>
                        <StyledTableCell component="th" scope="row"><Typography variant="h6"  sx={{ fontWeight: 'bold' }} >Step {index+1}: {step.name}</Typography></StyledTableCell>
                        <StyledTableCell component="th" scope="row"> {step.description}</StyledTableCell>
                        <StyledTableCell align="right">{step.sets}</StyledTableCell>
                        <StyledTableCell align="right">{step.reps}</StyledTableCell>
                        <StyledTableCell align="right">{step.recommandedTime}min</StyledTableCell>
                        </StyledTableRow>
                        </Fragment>

                        ))}
                        </TableBody>
                        </Table>
                        </TableContainer>

                </>
            {user instanceof Client
                ? <>
                    {!hasLiked
                        ?
                        <Button variant="contained" onClick={callLike} endIcon={<ThumbUpIcon/>}>
                            {program.likeCount}
                        </Button>
                        :
                        <>
                        <Button variant="contained" color="success" onClick={callDislike} endIcon={<ThumbUpIcon/>}>
                            {program.likeCount}
                        </Button>
                        </>
                    }</>
                : <>
                    <br/>
                    <br/>
                    <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteAction}>
                        Delete
                    </Button>
                </>
            }
        </div>
    );
};

export default ProgramPage;




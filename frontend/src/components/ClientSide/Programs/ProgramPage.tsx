import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import ProgramService from "../../../services/ProgramService";
import Program from "../../../types/Program";
import Step from "../../../types/Step";

import { useParams} from "react-router-dom";
import ClientNavbarLayout from "../ClientNavbarLayout";
import {Chip, Stack} from "@mui/material";

import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

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

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});


const ProgramPage: React.FC = () => {
    const defaultStep = new Step("",0,"",0,0,"",0)
    const defaultProgram = new Program(0,"",0,0,"",[defaultStep],"")
    const [program, setProgram] = useState<Program>(defaultProgram);
    const props = useParams();
    var totalRecommandedTime = 0;

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
                    console.log("view added")
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getProgramByID(props.id).then( () => "ok");
        addView(props.id).then( () => "ok");

    }, [props.id]);

    const getTotalRecommandedTime = () => {
        program.steps?.forEach(step =>
            totalRecommandedTime+= step.recommandedTime
        )
        console.log(totalRecommandedTime);
        return totalRecommandedTime
    }


    return (
        <div style={{ marginLeft: '15%', marginRight: '15%'
        }}>
            <ClientNavbarLayout />
            <br/>
            <br/>
            <br/>
            <br/>
            <Typography variant="h5"  sx={{ fontWeight: 'bold', textAlign: "center" }} >{program.name}</Typography>
            <br/>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Informations</Typography>
            <Stack direction="row" spacing={1}>
                <Chip label={getTotalRecommandedTime() +"min"} color="primary"/>
                <Chip label={"Strength Program"} color="primary" variant="outlined"/>
                <Chip label={"Intermediate"} color="primary"/>
                <Chip label="Theo URIOT" color="primary"  variant="outlined"/>
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
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Illustration</StyledTableCell>
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
                                    <StyledTableCell component="th" scope="row"><Typography variant="h6"  sx={{ fontWeight: 'bold' }} >Step {index+1}: {step.name}<br/></Typography>{step.description}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row"> <ImageSrc style={{ backgroundImage: `url("./"+${step.image})` }} /></StyledTableCell>
                                    <StyledTableCell align="right">{step.sets}</StyledTableCell>
                                    <StyledTableCell align="right">{step.reps}</StyledTableCell>
                                    <StyledTableCell align="right">{step.recommandedTime}min</StyledTableCell>
                                </StyledTableRow>
                            </Fragment>

                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default ProgramPage;




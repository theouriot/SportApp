import React from "react";
import {useEffect, useState} from "react";

import {Chip} from "@mui/material";
import CatProgramService from "../../services/CatProgram";
import LevelService from "../../services/LevelService";

interface Props {
    id: number;
}

const LevelChip: React.FC<Props> = (props) => {
    const [level, setLevel] = useState<string>("");

    useEffect(() => {
        const getCatProgramByID = async (id: any) => {
            await LevelService.getLevelByID(id)
                .then((response: any) => {
                    setLevel(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getCatProgramByID(props.id).then( () => "ok");

    }, [props.id]);

    if(level === "Master"){
        return (
            <Chip label={level}  color="error"/>
        );
    }
    else if(level === "Intermediate"){
        return (
            <Chip label={level}  color="warning"/>
        );
    }
    else {
        return (
            <Chip label={level} color="success"/>
        );
    }

};

export default LevelChip;




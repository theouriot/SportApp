import React from "react";
import {useEffect, useState} from "react";


import {Avatar, Chip} from "@mui/material";
import CatProgramService from "../../services/CatProgram";
import Data from "../../types/Data";
import Coach from "../../types/Coach";
import CoachService from "../../services/CoachService";

interface Props {
    id: number;
}

const CatChip: React.FC<Props> = (props) => {
    const [coach, setCoach] = useState<Coach>();

    useEffect(() => {
        const getCatProgramByID = async (id: any) => {
            await CoachService.getCoachByID(id)
                .then((response: any) => {
                    setCoach(response)
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getCatProgramByID(props.id).then( () => "ok");

    }, [props.id]);

    return (
        <Chip
            avatar={<Avatar alt={coach?.alias} src={coach?.alias} />}
            label={coach?.alias}
            variant="outlined"
        />
    );
};

export default CatChip;




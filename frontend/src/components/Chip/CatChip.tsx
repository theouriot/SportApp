import React from "react";
import {useEffect, useState} from "react";

import {Chip} from "@mui/material";
import CatProgramService from "../../services/CatProgram";

interface Props {
    id: number;
}

const CatChip: React.FC<Props> = (props) => {
    const [catProgram, setCatProgram] = useState<string>();

    useEffect(() => {
        const getCatProgramByID = async (id: any) => {
            await CatProgramService.getCatProgramByID(id)
                .then((response: any) => {
                    setCatProgram(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getCatProgramByID(props.id).then( () => "ok");

    }, [props.id]);

    return (
            <Chip label={catProgram} color="primary" />
    );
};

export default CatChip;




import React from "react";
import {useEffect, useState} from "react";

import Coach from "../../types/Coach";
import CoachService from "../../services/CoachService";

interface Props {
    id: number;
}

const AuthorArticle: React.FC<Props> = (props) => {
    const [coach, setCoach] = useState<Coach>();

    useEffect(() => {
        const getCatProgramByID = async (id: any) => {
            await CoachService.getCoachByID(id)
                .then((response: any) => {
                    console.log(id)
                    setCoach(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getCatProgramByID(props.id).then( () => "ok");

    }, [props.id]);

    return (
        <>{coach?.alias}</>
    );
};

export default AuthorArticle;




import * as React from 'react';
import CoachNavbarLayout from "./CoachNavbarLayout";
import ArticlesByCoach from "./Article/ArticlesByCoach";
import Typography from "@mui/material/Typography";
import ProgramsByCoach from "../Program/ProgramsByCoach";

export default function ClientHomePage() {
    return (
        <>
            <CoachNavbarLayout></CoachNavbarLayout>
            <br/>
            <br/>
            <br/>
            <Typography variant="h5">My Articles</Typography>
            <ArticlesByCoach coachId={undefined}></ArticlesByCoach>
            <Typography variant="h5">My Programs</Typography>
            <ProgramsByCoach coachId={undefined}/>
        </>
    );
}
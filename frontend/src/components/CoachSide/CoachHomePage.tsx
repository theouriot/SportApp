import * as React from 'react';
import CoachNavbarLayout from "./CoachNavbarLayout";
import ArticlesByCoach from "./Article/ArticlesByCoach";

export default function ClientHomePage() {
    return (
        <>
            <CoachNavbarLayout></CoachNavbarLayout>
            <br/>
            <br/>
            <br/>
            <ArticlesByCoach coachId={undefined}></ArticlesByCoach>
        </>
    );
}
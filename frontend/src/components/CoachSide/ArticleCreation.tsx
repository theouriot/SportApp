import * as React from 'react';
import CoachNavbarLayout from "./CoachNavbarLayout";
import {Box, Button, Stack, TextareaAutosize, TextField} from "@mui/material";
import ArticleService from "../../services/ArticleService";
import ArticleCreation from "../../types/ArticleCreation";

import {useUser} from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import Client from "../../types/Client";

export default function ClientHomePage() {
    const {user} = useUser();
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const article = new ArticleCreation(data.get('name'),user?._id,data.get('description'),data.get('content')," ");
        createArticle(article).then(() => "ok");
    };

    const createArticle = async (data: ArticleCreation) => {
        await ArticleService.create(data)
            .then((response: any) => {
                navigate("/myspace");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    if(user instanceof Client){
        navigate("/");
    }
    return (
        <>
            <CoachNavbarLayout></CoachNavbarLayout>
            <br/>
            <br/>
            <br/>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            New Article
                <Stack direction="column" alignItems="center" spacing={2}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Enter your article name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Write a brieve description"
                        name="description"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextareaAutosize
                        id="content"
                        name="content"
                        aria-label="minimum height"
                        minRows={30}
                        placeholder="Write here ! (or copy and past here) "
                        style={{ width: '75%' }}
                    />
                    <label htmlFor="contained-button-file">
                        <input
                            accept="image/*"
                            id="icon-button-video"
                            type="file"
                        />
                    </label>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{
                            borderRadius: 10,
                            fontSize: "18px"
                        }}
                    >
                        Create
                    </Button>
                </Stack>
            </Box>

        </>
    );
}
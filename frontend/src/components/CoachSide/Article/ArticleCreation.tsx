import * as React from 'react';
import CoachNavbarLayout from "../CoachNavbarLayout";
import {Box, Button, Stack, TextareaAutosize, TextField} from "@mui/material";
import ArticleService from "../../../services/ArticleService";
import ArticleCreation from "../../../types/ArticleCreation";

import {useUser} from "../../UserContext";

export default function ClientHomePage() {
    const {user} = useUser();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const article = new ArticleCreation(data.get('name'),user?._id,data.get('description'),data.get('content')," ");
        createComment(article).then(() => "ok");
    };

    const createComment = async (data: ArticleCreation) => {
        await ArticleService.create(data)
            .then((response: any) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <>
            <CoachNavbarLayout></CoachNavbarLayout>
            <br/>
            <br/>
            <br/>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            New program
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
                        Login
                    </Button>
                </Stack>
            </Box>

        </>
    );
}
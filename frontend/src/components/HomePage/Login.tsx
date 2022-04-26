import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HubTemplate from "./HubTemplate";

import { Link } from "react-router-dom";
import ClientNavbarLayout from "../ClientSide/ClientNavbarLayout";

const theme = createTheme();

export default function SignInSide() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <HubTemplate />
                <Grid item xs={12} sm={8} md={5}  component={Paper} elevation={6} square style={{
                    backgroundColor: "#093545",
                    color: "white",

                }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Typography component="p">
                            Sign in and start managing your sport program!
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Login"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                style={{
                                    backgroundColor: "#224957",
                                    borderRadius: 10,
                                }}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                style={{
                                    backgroundColor: "#224957",
                                    borderRadius: 10,
                                }}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: "#20DF7F",
                                    fontSize: "18px"
                                }}
                            >
                                Login
                            </Button>
                            <Link to='/register' key={1} style={{textDecoration:"none" }}>
                                <Button
                                        fullWidth
                                        variant="contained"

                                        style={{
                                            borderRadius: 10,
                                            backgroundColor: "#20DF7F",
                                            fontSize: "18px"
                                        }}
                                >
                                    Register me
                                </Button>
                            </Link>
                            <Link to='/home' key={1} style={{textDecoration:"none" }}>
                                <Button
                                    fullWidth
                                    variant="contained"

                                    style={{
                                        borderRadius: 10,
                                        backgroundColor: "#20DF7F",
                                        fontSize: "18px"
                                    }}
                                >
                                    Home
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
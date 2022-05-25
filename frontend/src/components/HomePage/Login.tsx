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
import LockIcon from '@mui/icons-material/Lock';

import { useNavigate } from 'react-router-dom';
import User from "../../types/User";
import Client from "../../types/Client";
import AuthService from "../../services/AuthService";
import {AccountCircle} from "@mui/icons-material";
import {InputAdornment} from "@mui/material";
import {useUser} from "../UserContext";
import Coach from "../../types/Coach";

const theme = createTheme();

export default function SignInSide() {
    let navigate = useNavigate();
    const { user, setUser } = useUser();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const signupModel = new User(data.get('id'),data.get('email'),data.get('email'),data.get('password'));
        login(signupModel).then(() => "ok");
    };

    const login = async (data: any) => {
        await AuthService.login(data)
            .then((response: any) => {
                // TO DO : Made the redirection
                if(response.role == "client"){
                    /* We create a client and we modify the contex */
                    const client = new Client(response._id,response.alias,response.email,response.password,null,null,null,null,null)
                    setUser(client);
                    navigate('/home/');
                }
                else{
                    /* We create a coach and we modify the contex */
                    const client = new Coach(response._id,response.alias,response.email,response.password,null)
                    setUser(client);
                    navigate('/mySpace/');
                }

            })
            .catch((e: Error) => {
                // TO DO : Made the error message
                console.log("erreur");
            });
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <HubTemplate />
                <Grid item xs={12} sm={8} md={5}  component={Paper} elevation={6} square style={{
                    backgroundColor: "#080808",
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
                                    backgroundColor: "#2E2E2E",
                                    borderRadius: 10,

                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    style: { color: '#fff' },
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
                                    backgroundColor: "#2E2E2E",
                                    borderRadius: 10,
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    style: { color: '#fff' },
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
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
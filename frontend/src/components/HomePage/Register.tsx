import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HubTemplate from "./HubTemplate";
import {Link} from "react-router-dom";
import AuthService from "../../services/AuthService";
import User from "../../types/User";

const theme = createTheme();
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SignInSide() {

    const [checked, setChecked] = React.useState(false);
    const [valid, setValid] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const signupModel = new User(data.get('id'),data.get('alias'),data.get('email'),data.get('password'));
        if(checked){
            signUpClient(signupModel).then(r => "ok");
        }
        else{
            signUpCoach(signupModel).then(r => "ok");
        }
    };

    const signUpClient = async (data: any) => {
        console.log('dans le signup client')
        await AuthService.signUpClient(data)
            .then((response: any) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const signUpCoach = async (data: any) => {
        console.log('dans le signup coach')
        await AuthService.signUpCoach(data)
            .then((response: any) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleValidation = (e: any) => {
        const reg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        setValid(reg.test(e.target.value));
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
                            Sign up
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
                                onChange={(e) => handleValidation(e)}
                                error={!valid}
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
                                name="id"
                                label="Id"
                                type="id"
                                id="id"
                                autoComplete="id"
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
                                autoComplete="password"
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
                                name="confirm-password"
                                label="Confirm your password"
                                type="confirm-password"
                                id="confirm-password"
                                autoComplete="current-password"
                                style={{
                                    backgroundColor: "#224957",
                                    borderRadius: 10,
                                }}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <Checkbox {...label} onChange={handleChange} />
                            Are you coach ?
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
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
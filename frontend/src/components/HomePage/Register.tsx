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
import AuthService from "../../services/AuthService";
import User from "../../types/User";
import {Alert, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";

const theme = createTheme();
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SignInSide() {

    const [checked, setChecked] = React.useState(false);
    const [valid, setValid] = React.useState(true);
    const [validPassword, setValidPassword] = React.useState(true);
    const [invalid, setInvalid] = React.useState(false);
    const [password, setPassword] = React.useState("");
    let navigate = useNavigate();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setInvalid(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const signupModel = new User(data.get('id'),data.get('alias'),data.get('email'),data.get('password'));
        if(!checked){
            signUpClient(signupModel).then(r => "ok");
        }
        else{
            signUpCoach(signupModel).then(r => "ok");
        }
    };

    const signUpClient = async (data: any) => {
        await AuthService.signUpClient(data)
            .then((response: any) => {
                navigate('/');
                return <Alert severity="success">You are now registered !</Alert>
            })
            .catch((e: Error) => {
                setInvalid(true)
                console.log(e);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const signUpCoach = async (data: any) => {
        await AuthService.signUpCoach(data)
            .then((response: any) => {
                navigate('/');
                return <Alert severity="success">You are now registered !</Alert>
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleValidation = (e: any) => {
        const reg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        setValid(reg.test(e.target.value));
    };

    const checkPasswordEquality = (e: any) => {
        if(password !== e.target.value) {
            setValidPassword(false);
        }
        else{
            setValidPassword(true);
        }
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
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => handleValidation(e)}
                                error={!valid}

                                style={{
                                    backgroundColor: "#2E2E2E",
                                    borderRadius: 10,
                                }}
                                InputProps={{
                                    style: { color: '#fff' }
                                }}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="alias"
                                label="Id"
                                type="alias"
                                id="alias"
                                autoComplete="id"
                                style={{
                                    backgroundColor: "#2E2E2E",
                                    borderRadius: 10,
                                }}
                                InputProps={{
                                    style: { color: '#fff' }
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
                                        backgroundColor: "#2E2E2E",
                                        borderRadius: 10,
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' }
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="Confirm your password"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="current-password"
                                    error={!validPassword}
                                    style={{
                                        backgroundColor: "#2E2E2E",
                                        borderRadius: 10,
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' }
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    onChange={(e) => checkPasswordEquality(e)}
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
                            <Snackbar open={invalid} autoHideDuration={2000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                                    An error has occured, the email or alias is already used
                                </Alert>
                            </Snackbar>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
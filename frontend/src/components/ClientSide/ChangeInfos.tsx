import * as React from 'react';
import ClientNavbarLayout from "./ClientNavbarLayout";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useUser} from "../UserContext";
import {Box} from "@mui/material";

import TextField from "@mui/material/TextField";

import Client from "../../types/Client";
import ClientService from "../../services/ClientService";

import {useNavigate} from "react-router-dom";

const ChangeInfos = () => {

    let navigate = useNavigate();
    const { user, setUser } = useUser();
    const [password, setPassword] = React.useState("");
    const [validPassword, setValidPassword] = React.useState(true);

    const checkPasswordEquality = (e: any) => {
        if(password !== e.target.value) {
            setValidPassword(false);
        }
        else{
            setValidPassword(true);
        }
    };

    const updateInfos = async (data: any) => {
        await ClientService.update(user?._id,data)
            .then((response: any) => {
                // If the update is done we can update client informations
                setUser(data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const client = new Client(user?._id,data.get("id"),data.get("email"),data.get("password"),data.get("age"),data.get("weight"),data.get("height"),null,null);
        updateInfos(client).then(() =>
            //  Home page redirection
            navigate('/home/')
        );
    };

    return (
        <>
            <ClientNavbarLayout></ClientNavbarLayout>
            <br/><br/><br/><br/>
            <Card sx={{ width: "80%", marginLeft:"10%"}} >
                <CardContent>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Typography variant="h5" component="div">
                       Your informations
                    </Typography>
                    <Typography variant="body2">
                        Email:
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="email"
                        label="Login"
                        name="email"
                        autoFocus
                        defaultValue={user?.email}
                        sx={{ width: "80%", marginLeft:"10%"}}
                    />
                    <Typography variant="body2">
                        ID
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="id"
                        label="Id"
                        name="id"
                        autoFocus
                        defaultValue={user?.alias}
                        sx={{ width: "80%", marginLeft:"10%"}}
                    />
                    <Typography variant="body2">
                        Password
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoFocus
                        sx={{ width: "80%", marginLeft:"10%"}}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography variant="body2">
                        Confirm password
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="confirm-password"
                        label="Confirm password"
                        name="confirm-password"
                        type="password"
                        autoFocus
                        sx={{ width: "80%", marginLeft:"10%"}}
                        error={!validPassword}
                        onChange={(e) => checkPasswordEquality(e)}
                    />
                    <Typography variant="body2">
                        Age
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="age"
                        label="Age"
                        name="age"
                        autoFocus
                        sx={{ width: "80%", marginLeft:"10%"}}
                        inputProps={{ min: 1, max: 100 }}
                        type="number"
                    />
                    <Typography variant="body2">
                        Weight
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="weight"
                        label="Weight"
                        name="weight"
                        autoFocus
                        sx={{ width: "80%", marginLeft:"10%"}}
                        inputProps={{ min: 1, max: 500 }}
                        type="number"
                    />
                    <Typography variant="body2">
                        Height
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="height"
                        label="Height"
                        name="height"
                        autoFocus
                        sx={{ width: "80%", marginLeft:"10%"}}
                        inputProps={{ min: 1, max: 500 }}
                        type="number"
                    />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2,width:"60%", marginLeft:"20%" }}
                            style={{
                                borderRadius: 10,
                                fontSize: "18px"
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </CardContent>

            </Card>
        </>
    );
};
export default ChangeInfos;
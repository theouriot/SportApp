import * as React from "react";
import Register from "./Register"
import Login from "./Login"

import {Fragment} from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

export default function CallPage() {
    const [loginPage, setLoginPage] = React.useState(true);

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(loginPage){
            setLoginPage(false)
        }
        else{
            setLoginPage(true)
        }
    };

    return (
        <Fragment>
            {loginPage == true
            ?
                <Fragment>
                    <Login></Login>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={buttonHandler}
                            style={{
                                borderRadius: 10,
                                backgroundColor: "#20DF7F",
                                fontSize: "18px"
                            }}
                        >
                            Register me
                        </Button>
                </Fragment>
            :
                <Fragment>
                    <Register></Register>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={buttonHandler}
                            style={{
                                backgroundColor: "#20DF7F",
                                fontSize: "18px"
                            }}
                        >
                            Login me
                        </Button>
                </Fragment>
            }


        </Fragment>
    )
}
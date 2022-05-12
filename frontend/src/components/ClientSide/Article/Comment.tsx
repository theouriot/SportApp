import React, {Fragment, useEffect, useState} from "react";

import { Avatar, Grid, Paper } from "@mui/material";
import CommentType from "../../../types/Comment"
import ClientService from "../../../services/ClientService";
import Client from "../../../types/Client";

interface Props {
    comment: CommentType;
}

const Comment: React.FC<Props> = (props) => {

    const defaultClient = new Client(0,"Anonymous","Anonymous","a",null,null,null,null,null)

    const [client, setClient] = useState<Client>();
    var date = new Date(props.comment.timestamp); // create Date object

    useEffect(() => {
        const getClientById = async (id: string) => {
            await ClientService.getClientByID(id)
                .then((response: any) => {
                    setClient(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getClientById(props.comment.author).then( () => "ok");
    }, [props.comment.author]);

    return (
        <Fragment>
        {client ?
                <div style={{ padding: 14 }} className="App">
                    <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt={client.alias}/>
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{client.alias}</h4>
                                <p style={{ textAlign: "left" }}>
                                    {props.comment.content}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                    posted on {date.toLocaleString()}
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                : <div style={{ padding: 14 }} className="App">
                <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt={defaultClient.alias}/>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{defaultClient.alias}</h4>
                            <p style={{ textAlign: "left" }}>
                                {props.comment.content}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                posted on {date.toLocaleString()}
                            </p>
                        </Grid>
                    </Grid>
                </Paper>
            </div> }
        </Fragment>
    );
};

export default Comment;



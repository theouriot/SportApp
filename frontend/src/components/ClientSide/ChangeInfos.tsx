import * as React from 'react';
import ClientNavbarLayout from "./ClientNavbarLayout";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ChangeInfos = () => {
    return (
        <>
            <ClientNavbarLayout></ClientNavbarLayout>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                       Your informations
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        Age
                    </Typography>
                    <Typography variant="body2">
                        Weight
                    </Typography>
                    <Typography variant="body2">
                        Height
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Change infos</Button>
                </CardActions>
            </Card>
        </>
    );
};
export default ChangeInfos;
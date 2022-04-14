import ImageHub from "../../images/homePageImage.jpg";
import Grid from "@mui/material/Grid";
import * as React from "react";

export default function HubTemplate() {
    return (
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: `url(${ImageHub})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    )
}
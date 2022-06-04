import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ArticleBar from "./Article/ArticleBar";
import ClientNavbarLayout from "./ClientNavbarLayout";
import ProgramBar from "../Program/ProgramBar";

import {Link} from "react-router-dom";
import { Grow} from "@mui/material";

const images = [
    {
        url: require('../../images/articles/article1.jpg'),
        title: "Search for an article",
        width: '40%',
        redirection: '/articles'
    },
    {
        url: require('../../images/avatar_coach.jpg'),
        title: 'Coaches',
        width: '30%',
        redirection: '/coaches'
    },
    {
        url: require('../../images/activityImage.jpg'),
        title: 'Search for a program',
        width: '30%',
        redirection: '/programs'
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function ClientHomePage() {
    return (
        <>
            <header>
                <ClientNavbarLayout/>
            </header>
            <br/>
            <br/>
            <br/>
            <br/>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            {images.map((image,index) => (

                <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}
                >
                    <Link to={image.redirection} key={index} style={{textDecoration:"none" }}>
                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                        >
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                    </Link>
                </ImageButton>
            ))}
        </Box>
            <Grow in={true} timeout={3000}>
                <Typography variant="h5">Last Programs</Typography>
            </Grow>
                <ProgramBar></ProgramBar>
            <Grow in={true} timeout={3000}>
                <Typography variant="h5">Last Articles</Typography>
            </Grow>
                <ArticleBar></ArticleBar>
        </>
    );
}
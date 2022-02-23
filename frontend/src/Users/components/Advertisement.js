import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function Advertisement(id) {

    const style ={
        position: "absolute",
        bottom:0,
        left:0,
        width:"100%",
        bgColor:"rgba(0, 0, 0, 0.54)",
        color: "white",
        padding: "10px",
    }

    return (
            <Card variant="outlined" sx={{ maxWidth: 350, my: 2, mx:"auto", border:"1px solid gray" }}>
                <Box sx={{ position: "relative"}}>
                    <Link to={`/advertisements/${id}`}>
                        <CardMedia
                        component="img"
                        height="140"
                        image="/assets/images/img2.jpg"
                        alt="passport"
                        />
                    </Link>
                    <Box sx={ style }>
                        <Typography variant="h5">Ad Header</Typography>
                        <Typography variant="body2">Advertisement Body</Typography>
                    </Box>
                </Box>
            </Card>
      )
}

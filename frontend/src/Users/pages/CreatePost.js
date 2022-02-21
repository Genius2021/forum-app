import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, Paper, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import { createCommunityPost, CommunityImageUpload } from '../../Redux/Users/actions/communityActions';
import Advertisement from '../components/Advertisement';
import Communities from "../components/LeftbarComponent";
import PageTitle from '../components/PageTitle';
import Tooltip from '@mui/material/Tooltip';

// import axios from "axios";


function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [images, setImages] = useState(null);
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userSignin);
    const username = userInfo?.username;          
    
    const stringLength = description.length;
    

    const publishHandler = (e) => {
        e.preventDefault();
        console.log(file)
        const filename = Date.now() + file.name
        if (file) {
            const data = new FormData();
            console.log(data);
            data.append("name", filename);
            data.append("file", file);
            // dispatch(CommunityImageUpload(data));
            dispatch(createCommunityPost(title, description, filename, username));
        }
    };

    const style = {
      position:"sticky", 
      top: "62.5px",
      zIndex: 20,
    }

    const textAreaStyle = {
      // maxWidth:"65vw", 
      color:"#666666", 
      // width:"96%", 
      display:"block", 
      marginBottom:3,
    }



    return (
        <>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={11.5} sm={11} md={7} lg={8}>
              <Box sx={ style }>
                <PageTitle name="Make a Post" />
              </Box>
              {/* <Paper sx={{ maxWidth: "100%", mx:"auto", zIndex:"50", mb:3}}> */}
              <section style={{mx:"auto"}}>
                  {

                      file && <img src={URL.createObjectURL(file)} style={{maxWidth: "20vw", borderRadius:"0.5rem"}} alt="write__image" />

                  }
                  <form style={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
                      <div style={{alignSelf:"flex-end"}}>
                          <label htmlFor="form__file">
                              <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>Choose image</Typography>}>
                                <ImageIcon sx={{fontSize:"4.5rem",color:"#555555", cursor:"pointer", "&:hover":{color:"#333333"}}}/>
                              </Tooltip>
                          </label>
                          <input type="file" id="form__file" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                      </div>
                      <div style={{display:"grid", width:"100%"}}>
                          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title of post" style={{marginBottom:10, fontFamily:"Roboto",color:"#666666"}} autoFocus />
                          <div style={{display:"grid"}}>
                            <textarea placeholder="Your Writeup Here" value={description} rows="10" style={textAreaStyle} onChange={e => setDescription(e.target.value)} />
                            <div style={{fontSize: "1.2rem", color:"#404040"}}>{stringLength } of 2000</div>
                            <button type="submit" style={{justifySelf: "end" }} onClick={publishHandler}>Publish</button>
                          </div>
                      </div>
                  </form>
              </section>
            </Grid>
            <Grid item xs={11.5} sm={11} md={4} lg={3} >
              <Box sx={ style }>
                <Box sx={ style }>
                  <PageTitle name="#Trending Now" width="30vw" />
                </Box>
                <Communities />
                <Advertisement />
              </Box>
            </Grid>
        </Grid>
        </>
    )
}

export default CreatePost


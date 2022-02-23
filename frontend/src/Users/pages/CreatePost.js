import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, Paper, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { createCommunityPost, CommunityImageUpload } from '../../Redux/Users/actions/communityActions';
import Advertisement from '../components/Advertisement';
import Communities from "../components/LeftbarComponent";
import PageTitle from '../components/PageTitle';
import Tooltip from '@mui/material/Tooltip';

// import axios from "axios";


function CreatePost(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [images, setImages] = useState(null);
    let [file, setFile] = useState(null);

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userSignin);
    const username = userInfo?.username;          
    const community = props.location.pathname.split("/")[2]
    
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
            console.log(data);
            // dispatch(CommunityImageUpload(data));
            // dispatch(createCommunityPost(title, description, filename, username, community));
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
      // width:"calc(100% - 2rem)", 
      display:"block", 
      marginBottom:3,
      resize:"vertical",
    }

    const deleteImageHandler =(e, key)=>{
      e.preventDefault();
      console.log("inside the delete handler, the key is...", key)
      let newValue;
      // let keys = Object.keys(file)
      
    if(file){

      const filteredArray = Array.from(file).filter((eachfile, currentIndex) =>{
        return file[currentIndex] !== file[key];  
    })
      const result = new File(filteredArray);
      console.log(result);
      console.log(filteredArray);

    }
     
    // const files = Object.assign({}, newValue)
    // setFile(newValue)
    
  }


    return (
        <>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={11.5} sm={11} md={7} lg={8}>
              <Box sx={ style }>
                <PageTitle name="Make a Post" />
              </Box>
              <section style={{mx: "auto"}}>
                <div style={{display: "flex", justifyContent: "center", overflowX:"auto", paddingTop:"0.5rem"}}>
                  {
                      file && Object.keys(file).map((key,currentIndex) =>{
                        console.log(key, currentIndex)
                        return <div key={currentIndex} style={{ display:"relative",marginRight:"0.5rem"}}>
                              <img src={URL.createObjectURL(file[key])} style={{maxWidth: "30vw", maxHeight:"35vh", borderRadius:"0.5rem", border:"1px solid #a4a4a4" }} alt="post_image" />
                              <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>Delete image</Typography>}><DeleteIcon sx={{display:"absolute", right:"0", bottom:"0", color:"red", "&:hover":{cursor:"pointer"}}} onClick={(e) =>deleteImageHandler(e, key)}/></Tooltip>
                        </div> 
                        }) 
                  }
                </div>
                  <form style={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
                      <div style={{alignSelf:"flex-end"}}>
                          <label htmlFor="form__file">
                              <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>Add images</Typography>}>
                                <ImageIcon sx={{fontSize:"4.5rem",color:"#555555", cursor:"pointer", "&:hover":{color:"#333333"}}}/>
                              </Tooltip>
                          </label>
                          
                          <input type="file" id="form__file" onChange={e => {e.preventDefault(); setFile(e.target.files)}} multiple style={{ display: "none" }} />
                      </div>
                      <div style={{display:"grid", width:"100%"}}>
                          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title of post" style={{marginBottom:10, fontFamily:"Roboto",color:"#666666"}} autoFocus />
                          <div style={{display:"grid"}}>
                            <textarea placeholder="Your Writeup Here" value={description} rows="10" style={textAreaStyle} onChange={e => setDescription(e.target.value)} />
                            <div style={{fontSize: "1.2rem", color:"#404040"}}>{stringLength } of 3000</div>
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


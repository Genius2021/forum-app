import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, CardContent, Divider, Grid, Paper, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { createCommunityPost, CommunityImageUpload } from '../../Redux/Users/actions/communityActions';
import Advertisement from '../components/Advertisement';
import Communities from "../components/LeftbarComponent";
import PageTitle from '../components/PageTitle';
import TextSelectionActions from '../components/TextSelectionActions';
import Tooltip from '@mui/material/Tooltip';
import TextEditor from '../components/TextEditor';
import Button from '../components/Button';

// import axios from "axios";


function CreatePost(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    let [file, setFile] = useState(null);

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userSignin);
    const username = userInfo?.username;          
    const community = props.location.pathname.split("/")[2];
    const textAreaRef = useRef();
    const iframeAreaRef = useRef();
  
    
    // const stringLength = description.length;
    // const iframeStringLength = iframeState.length;
    

    const publishHandler = (e) => {
        e.preventDefault();
        let theForm = document.getElementById("postCreationForm");
        theForm.elements["postCreationTextArea"].value = window.frames["postCreationiframe"].document.body.innerHTML;
        const textAreaValue = document.getElementById("postCreationTextArea").value
        const filename = Date.now() + file?.name
        if (file) {
            const data = new FormData();
            console.log(data);
            data.append("name", filename);
            data.append("file", file);
            console.log(data);
            // dispatch(CommunityImageUpload(data));
          }

        dispatch(createCommunityPost(title, textAreaValue, filename, username, community));
      };


    useEffect(()=>{
        const loadiframe = ()=>{
          const theiframe = document.getElementById("postCreationiframe").contentDocument;
          console.log(theiframe)
          document.getElementById("postCreationiframe").contentEditable = true;
          let editor = document.getElementById("postCreationiframe")
          let editorDoc = editor.contentWindow.document;
          let editorDoc1 = document.getElementById("postCreationiframe").contentDocument;
          let editorBody = editorDoc.body;
          if('spellcheck' in editorBody){
            editorBody.spellcheck = false;
          }
          
          if("contentEditable" in editorBody){
            editorBody.contentEditable = true;
            editorDoc1.designMode = 'on';
          }
         
          if('designMode' in editorDoc1){
              editorDoc1.designMode = 'on';
          }

          }
          loadiframe();
    }, [])

    
    
    const style = {
      position:"sticky", 
      top: "62.5px",
      zIndex: 20,
    }

    const iframeTextArea = {
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "1px #a4a4a4 solid",
      // fontSize: "1.6rem",
      outline: "none",
      fontFamily: "Times New Roman, Arial, sans-serif",
      color:"#666666", 
      width:"calc(100% - 2rem)", 
      marginBottom:3,
      resize:"vertical",
      backgroundColor:"white",
      minHeight:"30vh",
      overflowX:"hidden",
      wordWrap: "breakWord",

      
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
                  <form id="postCreationForm" style={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
                      <div style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
                          <div style={{ display:"flex", width:"100%", justifyContent:"center", overflowX:"auto"}}><TextEditor iframeName="postCreationiframe" TextSelectionActions={TextSelectionActions} /></div>
                          <label htmlFor="form__file" style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                            <Tooltip title={<Typography sx={{ fontSize: "0.85rem" }}>Add images</Typography>}>
                              <ImageIcon sx={{ fontSize:"3rem",color:"#555555", cursor:"pointer", "&:hover":{color:"#333333"}}}/>
                            </Tooltip>
                          </label>                        
                        <input type="file" id="form__file" onChange={e => {e.preventDefault(); setFile(e.target.files)}} multiple style={{ display: "none" }} />
                      </div>
                      <div style={{display:"grid", width:"100%"}}>
                          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title of post" style={{marginBottom:10, fontFamily:"Roboto",color:"#666666"}} autoFocus />
                          <div id="iframeContainer" style={{display:"grid"}}>
                            <textarea id="postCreationTextArea" style={{display:"none"}} />
                            <iframe name="postCreationiframe" id="postCreationiframe" title="iframeTextField" value={description} style={iframeTextArea}></iframe>
                            {/* <div style={{ fontSize: "1.2rem", color:"#404040" }}>{ iframeAreaRef.current?.value.length || 0 } of 3000</div> */}
                            <Button type="submit" justifySelf="end"  largeContainedButton onClick={publishHandler}>Publish</Button>
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
                <Advertisement passedIndex={2} />
              </Box>
            </Grid>
        </Grid>
        </>
    )
}

export default CreatePost


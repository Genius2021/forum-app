import { Box, Card, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { capitalize } from '../../commonFunctions';
import { useState } from 'react';


function TextEditor({ TextSelectionActions, iframeName, flexWrap, width, border}) {

   const [textColorPicker, setTextColorPicker] = useState("");
   const [backgroundColorPicker, setBackgroundColorPicker] = useState("");

   const colorPickerHandler = (e, el)=>{
      e.preventDefault();

      if(el.command === 'foreColor'){
         setTextColorPicker(e.target.value);
      }else if(el.command === 'backColor'){
         setBackgroundColorPicker(e.target.value);
      }
     
      TextSelectionActions(e, el, iframeName);
   }

    const style ={
        fontSize:"0.85rem",
    }

   //  const colorPickerHandler =()=>{
   //    return <input type="color" />;
   //  }

      const backStyle ={
        cursor:"pointer",
        backgroundColor:"yellow",
        marginRight: "0.2rem",
        fontSize:"1.2rem",
        padding:"0.1rem",
      //   borderRadius:"50%"
      }

    const iconStyle={
        cursor:"pointer",
        color:"#555555",
        marginRight: "0.2rem",
        fontSize:"1.2rem",
    }

    const selectStyle ={
      borderRadius: "0.5rem",
      border: "1px #a4a4a4 solid",
      fontFamily: "Helvetica, Arial, sans-serif",
      outline: "none",
      marginRight: "0.2rem",
      padding:"0.15rem",
      fontSize:"1rem"
   
    }


    let defaultElements = [
      {command: 'bold', tooltip: 'Bold', type: 'button', className:  "fas fa-bold"},
      {command: 'italic', tooltip: 'Italic', type: 'button', className:  "fas fa-italic"},
      {command: 'underline', tooltip: 'Underline', type: 'button', className:  "fas fa-underline"},
      {command: 'strikeThrough', tooltip: 'StrikeThrough', type: 'button', className:  "fas fa-strikethrough"},
      {command: 'justifyCenter', tooltip: 'Justify center', type: 'button', className:  "fas fa-align-center"},
      {command: 'justifyFull', tooltip: 'Justify full', type: 'button', className:  "fas fa-align-justify"},
      {command: 'justifyLeft', tooltip: 'Justify left', type: 'button', className:  "fas fa-align-left"},
      {command: 'justifyRight', tooltip: 'Justify right', type: 'button', className:  "fas fa-align-right"},

      //new buttons added
      {command: 'insertUnorderedList', tooltip: 'Unordered list',  type: 'button', className:  "fa fa-list-ul"},
      {command: 'insertOrderedList', tooltip: 'Ordered list', type: 'button', className:  "fa fa-list-ol"},
      {command: 'indent', tooltip: 'Indent', type: 'button', className:  "fa fa-indent"},
      {command: 'subscript', tooltip: 'Subscript', type: 'button', className:  "fa fa-subscript"},
      {command: 'superscript', tooltip: 'Superscript', type: 'button', className:  "fa fa-superscript"},
      {command: 'backColor', tooltip: 'Background colour', type: 'button', className:  "fa fa-font"},
      {command: 'foreColor', tooltip: 'Text colour', type: 'button', className:  "fas fa-palette"},
      {command: 'outdent', tooltip: 'Outdent', type: 'button', className:  "fa fa-outdent"},
      {command: 'formatBlock', tooltip: 'Format block', type: 'select', name: 'formatblock', options: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']},
      {command: 'insertHorizontalRule', tooltip: 'Horizontal Rule', type: 'button', className: 'HR'},
      {command: 'createLink', tooltip: 'Create link', type: 'button', className:  "fa fa-link"},
      {command: 'unlink', tooltip: 'Unlink', type: 'button', className:  "fa fa-unlink"},
      {command: 'fontName', tooltip: 'FontName', type: 'select', name: 'fontname', options: ['Arial', 'Comic Sans MS', 'Courier', 'Sans-serif', 'Georgia', 'Times New Roman', 'Verdana', 'Courier New', 'Segoe UI Mono', 'Tahoma', 'Trebuchet MS', 'Garamond', 'Brush Script MT', 'Helvetica', ]},
      {command: 'fontSize', tooltip: 'FontSize', type: 'select', name: 'fontsize', options: [1, 2, 3, 4, 5, 6, 7]},
      {command: 'insertImage', tooltip: 'Insert image url', type: 'button', className:  "fa fa-file-image"},
      // {command: 'viewSourceCode', tooltip: 'View source code', type: 'button', className:  "fa fa-code"},
      
   ];


  return (
    <>
        <Card variant="outlined" sx={{ display:"grid", width: {width}, border:"none"}}>
         {/* { width && <Typography sx={{textAlign:"center", marginTop:"0.3rem", fontSize:"1rem", color:"#555555", fontFamily:"Arial", alignSelf:"center"}}>Text Editor</Typography> } */}
            <Box sx={{display:"flex", alignItems:"center",justifyContent:"center", mx:"auto",paddingTop: 0, flexWrap:{flexWrap}}}>
            {
               
               defaultElements.map((el, index)=>{
                  if(el.type === "button"){
                     if(el.command === "insertHorizontalRule"){
                        return  <Tooltip key={index} title={<Typography sx={style}>{capitalize(el.tooltip)}</Typography>}>
                                 <Card elevation={0} sx={iconStyle}>
                                    <i style={iconStyle}  onClick={(e)=> TextSelectionActions(e, el, iframeName)}>HR</i>
                                 </Card>
                             </Tooltip>

                     }else if(el.command === "foreColor"){
                        return  <Tooltip key={index} title={<Typography sx={style}>{capitalize(el.tooltip)}</Typography>}>
                                 <Card elevation={0} sx={iconStyle}>
                                    <div><label htmlFor="colorPicker"><i style={iconStyle} className={el.className}></i></label><input id="colorPicker" value={textColorPicker} onChange={(e) =>colorPickerHandler(e, el)} style={{display: "none" }} type="color" /></div>
                                 </Card>
                             </Tooltip>
                     }else if(el.command === "backColor"){
                        return  <Tooltip key={index} title={<Typography sx={style}>{capitalize(el.tooltip)}</Typography>}>
                                 <Card elevation={0} sx={iconStyle}>
                                    <div><label htmlFor="backgroundColorPicker"><i style={backStyle} className={el.className}></i></label><input id="backgroundColorPicker" value={backgroundColorPicker} onChange={(e) =>colorPickerHandler(e, el)} style={{display: "none" }} type="color" /></div>
                                 </Card>
                             </Tooltip>
                     }else{
                        return  <Tooltip key={index} title={<Typography sx={style}>{capitalize(el.tooltip)}</Typography>}>
                                 <Card elevation={0} sx={iconStyle}>
                                    <i style={iconStyle} className={el.className} onClick={(e)=> TextSelectionActions(e, el, iframeName)}></i>
                                 </Card>
                             </Tooltip>
                     }
                     
                  }else{
                     return <Tooltip key={index} title={<Typography sx={style}>{capitalize(el.tooltip)}</Typography>}>
                        <Card elevation={0}>
                          <select style={selectStyle} name={el.name} onChange={(e)=> {TextSelectionActions(e, el, iframeName)}}>
                              {
                                 el.options.map((op, index)=>{
                                    return <option key={index} style={{color:"#555555",fontSize:"1.15rem"}} value={op}>{op}</option>
                                       })
                              }
                           </select>
                        </Card>
                         
                     </Tooltip>
                  }
               }) 
            }
            </Box>
         </Card>
    </>
  )
}

export default TextEditor
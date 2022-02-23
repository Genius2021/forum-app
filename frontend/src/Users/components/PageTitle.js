import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { capitalize } from "../../commonFunctions"


export default function PageTitle({ name, width, textAlign, paddingLeft }) {
  const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const result =  alphabets.find( alphabet =>{
        return name[0].toLowerCase() === alphabet ? true : false;
      })

      const boldenCommunity = name.includes(":") && name.split(":")[0] 
      const title = name.includes(":") && name.split(":").slice(1).join(":")
      
  
  return (<Box sx={{ display:"flex", justifyContent:"center" }}>
      <Paper elevation={2} sx={{ display:"flex", justifyContent:"center",alignItems:"center", padding:"0.5rem", width:`${width || "100%"}`, height: 30, mb: "1rem", position:"sticky" }}>
        <Typography variant="h4" sx={{color:"#555555", width:"100%", textAlign:`${textAlign || "center"}`, paddingLeft:{paddingLeft}, fontSize:"1.5rem" }}>{ paddingLeft ? <div><span style={{fontWeight:"bold"}}>{boldenCommunity}</span>:{title}</div>: result ? capitalize(name) : name }</Typography>
      </Paper>
  </Box>);
}

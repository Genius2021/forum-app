import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { capitalize } from "../commonFunctions"


export default function PageTitle({ name }) {
  const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const result =  alphabets.find( alphabet =>{
        return name[0].toLowerCase() === alphabet ? true : false
      })
  
  return (<Box>
      <Paper elevation={2} sx={{ display: "flex", alignItems:"center", height: 30, mb: 1, position:"sticky" }}>
        <Typography variant="h4" sx={{color:"#555555", width:"100%", textAlign:"center" }}>{ result ? capitalize(name) : name }</Typography>
      </Paper>
  </Box>);
}

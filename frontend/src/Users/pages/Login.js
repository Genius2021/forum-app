import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { signin } from "../../Redux/Users/actions/userActions";
import AlertComponent  from "../components/AlertComponent";
import { clearMessage } from '../../Redux/Users/actions/generalActions';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';


export default function Login(props) {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleShowPassword =()=>{
      setShowPassword(!showPassword)
    }

    const handleChecked =()=>{
      setIsChecked(!isChecked)
    }

    const redirect = props.location.search && props.location.search.split("=")[1]

    const { userInfo, loading, error } = useSelector(state => state.userSignin);

    const { registerInfo } = useSelector(state => state.userRegister);

    const { errorMessage, successMessage } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
      e.preventDefault();
      if(password === null){
        alert("password field cannot be empty")
      }else if( !password || !email ){
          alert("Some fields were left empty! Fill them.");
      }else{
          dispatch(signin( email, password, isChecked ));
          setEmail("");
          setPassword("");
      }
    }

    const visibility ={
      fontSize:"2rem",
    }

      useEffect(() => {
        if(userInfo){
            props.history.push("/");
        }
        
        if(redirect){
            if(userInfo){
                props.history.push(redirect);
            }
        }
    }, [props.history,redirect,userInfo,])

    setTimeout(()=>{dispatch(clearMessage())}, 40000);

  return (
      <>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={10} sm={8} md={6} lg={6} sx={{ mb: 3 }}>
            <Box
            component="form"
            sx={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                height: 'calc(100vh - 62.5px)',
                '& > :not(style)': { width: '100%'},
                "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {marginTop: "15px"}
            }}
            noValidate
            autoComplete="off"
            >
            <Typography variant="h2" sx={{textAlign: "center", marginBottom: "20px", fontSize:"2.5rem", color:"#555555"}}>Welcome back Boss! Log In.</Typography>
            { (errorMessage || error) && <AlertComponent typeOfAlert="error">{errorMessage || error }</AlertComponent> }
            { registerInfo && successMessage && <AlertComponent typeOfAlert="success">{ successMessage }</AlertComponent> }
            <TextField required id="outlined-basic" label="Email" InputProps={{style:{fontSize: "1.2rem", color: "#777777"}}} InputLabelProps={{style:{fontSize: "1.5rem" }}} variant="outlined" autoFocus onChange={e => setEmail(e.target.value)} />
            <div style={{margin:"0.5rem 0"}}></div>
            <TextField required id="outlined-basic" label="Password" variant="outlined" type={ showPassword ? "text": "password" } InputProps={{style:{fontSize: "1.2rem", color: "#777777" },  endAdornment: <InputAdornment position="end" sx={{ "&:hover": {cursor: "pointer"} }} onClick={handleShowPassword}>{ showPassword ? <VisibilityOff sx={visibility} /> : <Visibility sx={visibility} /> }</InputAdornment> }} InputLabelProps={{style:{fontSize:"1.5rem"}}} onChange={e => setPassword(e.target.value)}/>
            <FormControlLabel
              value="top"
              control={<Checkbox color="success" 
              onClick={handleChecked}
              checked={isChecked} 
              sx={{ '& .MuiSvgIcon-root': { fontSize: 15 }, display:"flex", alignSelf: "center"}}/>}
              label={<Typography variant="subtitle2" sx={{color:"#444444"}} >Remember me</Typography>}
            />
            <Button variant="contained" endIcon={loading && <CircularProgress size="2rem" sx={{ color:"white" }} />} onClick={submitHandler} size="large" sx={{marginTop: "1.3rem", fontSize: "1.2rem", backgroundColor:"#3b5998", "&:hover": {cursor:`${loading && "not-allowed"}`}}}>Login</Button>
            </Box>
          </Grid>
        </Grid>
    </>
  );
}

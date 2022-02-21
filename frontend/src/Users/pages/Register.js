import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { photoUpload, register } from '../../Redux/Users/actions/userActions';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingComponent from '../components/LoadingComponent';
import AlertComponent from '../components/AlertComponent';
import CircularProgress from '@mui/material/CircularProgress';



export default function Register(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/login";
  const { registerInfo, loading, error } = useSelector(state => state.userRegister);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword =()=>{
      setShowPassword(!showPassword)
    }

    const handleShowConfirmPassword =()=>{
      setShowConfirmPassword(!showConfirmPassword)
    }

    const handleChecked =()=>{
      setIsChecked(!isChecked)
    }

  const submitHandler = (e) => {
      e.preventDefault();
      if(password !== confirmPassword){
          alert("Passwords do not match");
      }else if( !firstname || !lastname || !username || !password || !confirmPassword || !email ){
          alert("Some fields were left empty! Fill them.");
      }else if(!isChecked){
        alert("To proceed, you must agree to our terms of service. Check the box!")
      }else{
          const filename = Date.now() + file?.name;
          if (file) {
              const data = new FormData();
              data.append("name", filename);
              data.append("file", file);
              dispatch(photoUpload(data));
        }
          dispatch(register(firstname, lastname, username, email, filename, password));
      }
  }

  useEffect(() => {
      if (registerInfo) {
          props.history.push(redirect);
      }
  }, [props.history,redirect,registerInfo])

  return (
      <>
        <Box
        component="form"
        sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            height: 'calc(100vh - 62.5px)',
            '& > :not(style)': { width: '50vw'},
            "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {marginTop: "15px"}
        }}
        noValidate
        autoComplete="off"
        >
        <Typography variant="h2" sx={{textAlign: "center", marginBottom: "20px", color:"#555555"}}>Register now, for Free!</Typography>
        { loading && <LoadingComponent loading={loading} ></LoadingComponent> }
        { error && <AlertComponent typeOfAlert="error">{error}</AlertComponent> }
        <TextField required id="outlined-basic" label="firstname" variant="outlined" autoFocus InputProps={{style:{fontSize: "1.2rem", color: "#777777" }}} InputLabelProps={{style:{fontSize: "1.5rem"}}} onChange={e => setFirstname(e.target.value)} />
        <TextField id="outlined-basic" label="lastname" variant="outlined" InputProps={{style:{fontSize: "1.2rem", color: "#777777" }}} InputLabelProps={{style:{fontSize:"1.5rem"}}} onChange={e => setLastname(e.target.value)} />
        <TextField required id="outlined-basic" label="Username" variant="outlined" InputProps={{style:{fontSize: "1.2rem", color: "#777777" }}} InputLabelProps={{style:{fontSize:"1.5rem"}}} onChange={e => setUsername(e.target.value)} />
        <TextField required id="outlined-basic" label="Email" variant="outlined" InputProps={{style:{fontSize: "1.2rem", color: "#777777" }}} InputLabelProps={{style:{fontSize:"1.5rem"}}} onChange={e => setEmail(e.target.value)} />
        <TextField required id="outlined-basic" label="Password" variant="outlined" type={ showPassword ? "text" : "password" } InputProps={{style:{fontSize: "1.2rem", color: "#777777" },  endAdornment: <InputAdornment position="end" sx={{ "&:hover": {cursor: "pointer"}, fontSize: "10px"}} onClick={handleShowPassword}>{ showPassword ? <VisibilityOff /> : <Visibility />}</InputAdornment> }} InputLabelProps={{style:{fontSize:"1.5rem"}}} onChange={e => setPassword(e.target.value)} />
        <TextField required id="outlined-basic" label="Confirm Password" variant="outlined" type={ showConfirmPassword ? "text" : "password" } InputProps={{style:{fontSize: "1.2rem", color: "#777777" },  endAdornment: <InputAdornment position="end" sx={{ "&:hover": {cursor: "pointer"}}} onClick={handleShowConfirmPassword}>{ showConfirmPassword ? <VisibilityOff /> : <Visibility />}</InputAdornment> }} InputLabelProps={{style:{fontSize:"1.5rem"}}} onChange={e => setConfirmPassword(e.target.value)} />
        <FormControlLabel
          value="top"
          control={<Checkbox color="success"
          onClick={handleChecked}
          checked={isChecked} 
          sx={{ '& .MuiSvgIcon-root': { fontSize: 15 }, display:"flex", alignItems: "center"}}/>}
          label={<Typography variant="subtitle2" sx={{color:"#444444"}} >By clicking on the checkbox, you agree to abide by our terms and conditions of service.</Typography>}
        />
        <Button variant="contained" endIcon={loading && <CircularProgress size="2rem" sx={{ color:"white" }} />} onClick={submitHandler} size="large" sx={{marginTop: "1.3rem", fontSize: "1.2rem", backgroundColor:"#3b5998"}}>Register</Button>
        </Box>
    </>
  );
}

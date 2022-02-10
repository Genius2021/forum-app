import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import { closeSidebar, openSidebar } from '../Redux/actions/sidebarActions';
import { useDispatch, useSelector } from 'react-redux';
import AccountMenu from "./AccountMenu";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {

  const { sidebarState } = useSelector(state => state.sidebarState);
  const { userInfo } = useSelector(state => state.userSignin);
  const dispatch = useDispatch();

  const menuToggle = ()=> {
    sidebarState && dispatch(closeSidebar());
    !sidebarState && dispatch(openSidebar());
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "white", color:"gray", boxShadow:"-1px 5px 9px -7px #000000" }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={menuToggle}
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{fontSize:"20px"}} />
          </IconButton>
          <Link to="/">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                E-BOOK
            </Typography>
          </Link>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{color:"blue"}}/>
            </SearchIconWrapper>
            <StyledInputBase
              sx={{border:"1px solid gray", borderRadius:"5px"}}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          { userInfo && <AccountMenu /> }
          { userInfo ? (<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>Show more</Typography>}>
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon sx={{fontSize:"15px"}}/>
              </IconButton>
            </Tooltip>
          </Box>) : (
                  <Stack direction="row" spacing={2}>
                    <Link to="/login">
                      <Button variant="outlined">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="contained">
                        Sign Up
                      </Button>
                    </Link>
                    
                </Stack>
          )
         } 
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

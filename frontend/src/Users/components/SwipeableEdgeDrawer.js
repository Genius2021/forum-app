import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LeftbarComponent from "../../components/LeftbarComponent";

// const drawerBleeding = 56;
const drawerBleeding = 205.719;

const Root = styled('div')(({ theme }) => ({
  // height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));


export default function SwipeableEdgeDrawer(props) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Root>
      <CssBaseline />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer}>Open</Button>
      </Box>
      <SwipeableDrawer
        // container={container}
        // anchor="top"
        open={open}
        // onClose={toggleDrawer(false)}
        // onOpen={toggleDrawer}
        swipeAreaWidth={drawerBleeding}
        // disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <LeftbarComponent />
      </SwipeableDrawer>
    </Root>
  );
}


 

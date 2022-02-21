import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { clearMessage } from '../../Redux/Users/actions/generalActions';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../commonFunctions';

export default function AlertComponent({ children, typeOfAlert }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open ? open : children && true}>
        <Alert
          severity={ typeOfAlert } //severities you can use are error, warning, info, success
          action={
            <IconButton
              aria-label="close"
              // sx={{'&:hover': {color:"#000000"}}}
              size="small"
              onClick={() => {
                dispatch(clearMessage())
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, fontSize: "1.3rem" }}
        >
        <AlertTitle>{ capitalize(typeOfAlert) }</AlertTitle>
         { children }
        </Alert>
      </Collapse>
    </Box>
  );
}

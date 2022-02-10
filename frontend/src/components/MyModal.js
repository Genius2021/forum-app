import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from "../Redux/actions/generalActions"
import { signout } from '../Redux/actions/userActions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60vw",
  bgcolor: 'background.paper',
  border: '0.5px solid grey',
  boxShadow: 24,
  px: 3,
  pt: 2,
  pb:1.5
};

export default function MyModal({ question, comment }) {

  const { status } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const HandleProceed = () =>{
    dispatch(signout());
    // location.push("/");

  }


  // const [open, setOpen] = React.useState(status);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={status}
        // onClose={handleClose}
        onClose={()=>(dispatch(closeModal()))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* Quick One */}
            {comment}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {/* Are you sure you want to continue? */}
          {question}
          </Typography>
          <Box sx={{display:"flex", justifyContent:"flex-end", mt:2}}>
            <Button variant="contained" onClick={()=>(dispatch(closeModal()))} size="small" startIcon={<CloseIcon /> } color="error" sx={{mr:"10px"}}>Cancel</Button>
            <Button variant="outlined" onClick={HandleProceed}>Proceed</Button>
          </Box>
            
        </Box>
      </Modal>
    </>
  );
}

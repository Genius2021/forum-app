import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from "../../Redux/Users/actions/generalActions"
import { signout } from '../../Redux/Users/actions/userActions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40vw",
  bgcolor: 'background.paper',
  borderRadius: '0.5rem',
  boxShadow: 24,
  border:"1px solid rgba(0, 0, 0, 0.12)",
  px: 3,
  pt: 2,
  pb:1.5,
};

export default function MyModal({ question, signOutAction, modalName, specificAction }) {

  const { isOpen, typeOfModal} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const HandleProceed = () =>{
    if(signOutAction){
      dispatch(signout());
      dispatch(closeModal(modalName));

    }else{
      // dispatch(specificAction) for instance, implement a delete action
      dispatch(closeModal(modalName));
      console.log("got to proceed")
    }
  }


  return (
    <>
      <Modal
        open={typeOfModal === modalName && isOpen}
        // onClose={handleClose}
        // onClose={()=>(dispatch(closeModal(modalName)))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {comment}
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {/* Are you sure you want to continue? */}
          {question}
          </Typography>
          <Box sx={{display:"flex", justifyContent:"flex-end", mt:2}}>
            <Button variant="contained" onClick={()=>(dispatch(closeModal(modalName)))} size="small" startIcon={<CloseIcon /> } color="error" sx={{mr:"10px"}}>Cancel</Button>
            <Button variant="outlined" onClick={HandleProceed}>Proceed</Button>
          </Box>
            
        </Box>
      </Modal>
    </>
  );
}

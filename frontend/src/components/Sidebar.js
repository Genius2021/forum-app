import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { closeSidebar, openSidebar } from '../Redux/actions/sidebarActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Sidebar() {

  const whatState = useSelector(state => state.sidebarState);
  const { sidebarState } = whatState;

  const dispatch = useDispatch();

  // const [open, setOpen] = React.useState(true);

    const menuClose = ()=> {
        dispatch(closeSidebar());
    }

    const menuOpen = ()=>{
        dispatch(openSidebar())
    }

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
          <SwipeableDrawer 
          open={sidebarState}
          onClose={menuClose}
          onOpen={menuOpen}
          sx={{display:"flex"}}
          >
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'block' }, textAlign:"center", marginTop:"5px"}}
            >
                UNILAG BOOK
            </Typography>
            <CloseIcon
                 sx={{fontSize: 25, alignSelf:"flex-end", cursor:"pointer",}}
                 onClick={menuClose}
                 color="inherit"
                 aria-haspopup="true"

            />
            {list()}
          </SwipeableDrawer>
    </div>
  );
}

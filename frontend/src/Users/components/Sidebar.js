import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { closeSidebar, openSidebar } from '../../Redux/Users/actions/sidebarActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarDropdown from './SidebarDropdown';
import { Badge } from '@mui/material';

// const useStyles = makeStyles(theme =>({
//   badge:{fontSize: 30}
// }))

export default function Sidebar() {
  const { userInfo } = useSelector(state => state.userSignin);
  const { sidebarState } = useSelector(state => state.sidebarState);

  const dispatch = useDispatch();

    const menuClose = ()=> {
        dispatch(closeSidebar());
    }

    const menuOpen = ()=>{
        dispatch(openSidebar())
    }
   
    let sidebarTopElements = [
      {text: 'Home', link: '/', font: <i className="fas fa-home"></i>},
      {text: 'Trending', link: '/trending', font: <i className="fas fa-chart-line"></i>},
      {text: 'Communities', font: <i className="fas fa-users"></i>, communities: [ {name: "Politics", link:"/communities/politics"}, {name: "Science and Tech", link:"/communities/science-and-tech"}, {name: "Sports", link:"/communities/sports"}, {name: "Entertainment", link: "/communities/entertainment"}, {name: "Education", link:"/communities/education"}, {name: "Business", link: "/communities/business"}, {name: "Programming", link:"/communities/programming"}, {name: "Love", link: "/communities/love"}, {name: "Food and Agriculture", link:"/communities/food-and-agriculture"}, {name: "Earth Sustainability", link:"/communities/earth-sustainability"}, {name: "Gaming", link: "/communities/gaming"}, {name: "Culture and Tradition", link: "/communities/culture-and-tradition"}, {name: "Religion", link:"/communities/culture-and-tradition"}]},
      {text: 'Advertise', link: '/advertise', font: <i className="fas fa-ad"></i>},
      {text: 'Suggestions', link: '/suggestions', font: <i className="fas fa-lightbulb"></i>},

   ];

    let sidebarBottomElements = [
      {text: 'Messages', link: '/messages', font: <i className="fas fa-envelope"></i>},
      {text: 'My Dashboard', link: '/dashboard', font: <i className="fas fa-clipboard"></i>},
      {text: 'Account', link: `/users/${userInfo?.username}`, font: <i className="fas fa-user"></i>},
    
   ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {sidebarTopElements.map((el, index) => {
          if(el.text === "Communities"){
            return <ListItem button key={index}>
                <ListItemIcon>
                  {el.font}
                </ListItemIcon>
                <Typography sx={{display:"flex", alignItems:"center"}}>
                  <ListItemText primary={el.text} />
                  <i style={{marginLeft:"0.5rem"}} className="fas fa-caret-down"></i>
                </Typography>
              
              <SidebarDropdown communitiesArray={el.communities} />
              </ListItem>
          }else{
            return <Link to={el.link} onClick={menuClose} key={index}>
              <ListItem button>
                <ListItemIcon>
                  {el.font}
                </ListItemIcon>
                <ListItemText primary={el.text} />
              </ListItem>
            </Link>
          }
          
        })}
      </List>
      <Divider />
      <List>
        {sidebarBottomElements.map((el, index) => {
         if(el.text === "Messages"){
           return <Link to={el.link} onClick={menuClose} key={index}>
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={4} color="error">
                    {el.font}
                </Badge>
              </ListItemIcon>
              <ListItemText primary={el.text} />
            </ListItem>
          </Link>

         }else{

           return <Link to={el.link} onClick={menuClose} key={index}>
            <ListItem button>
              <ListItemIcon>
                {el.font}
              </ListItemIcon>
              <ListItemText primary={el.text} />
            </ListItem>
            </Link>
         }
         
        })}
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
                DING
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

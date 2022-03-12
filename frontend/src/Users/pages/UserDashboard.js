import FeaturedInfo from "../components/FeaturedInfo"
import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { capitalize } from "../../commonFunctions"




function UserDashboard() {
    const { userInfo } = useSelector(state => state.userSignin);


  return (
    <>
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sm={10} md={10} lg={10} sx={{color:"#555555"}}>
            <Box>
                <Typography sx={{fontSize:"1.5rem", marginTop:"2rem", marginLeft:"1rem"}}>Your dashboard <span style={{fontSize:"2rem", fontWeight:"bold"}}>{capitalize(userInfo.username)}</span> </Typography>
                <Divider  variant="middle" sx={{marginBottom:"2rem"}} />
                <FeaturedInfo />
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"1rem" }}>
                <Card variant="outlined" sx={{ maxWidth: 360, mb: 1, width:200 }}>
                    <CardContent>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                        <Divider  />
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Work" secondary="Jan 7, 2014" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                        <Divider />
                    </List>
                 </CardContent>


                </Card>
            </Box>
            
        </Grid>
      </Grid>
    </>
  )
}

export default UserDashboard
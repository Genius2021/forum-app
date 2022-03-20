import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from './Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { capitalize } from '../../commonFunctions';


const communities = [ "Politics", "Science and Tech", "Sports", "Entertainment", "Education", "Business", "Programming", "Love", "Food and Agriculture", "Earth Sustainability", "Gaming", "Culture and Tradition", "Religion", "Humanitarian"]

export default function LeftbarComponent() {

    return (
            <Paper elevation={0} sx={{ maxWidth: 350, mx:"auto", zIndex:"50"}}>
                <Card variant="outlined" sx={{ maxWidth: 350, mb: 1 }}>
                    <CardContent sx={{py:"0 !important", px:"0 !important"}}>
                        <Typography variant="body2" color="text.secondary" sx={{textAlign:"center"}}>
                            {   communities.map((community, index) =>{
                                    if(community.includes(" ")){
                                        const joinedWords = community.split(" ").join("-").toString().toLowerCase();
                                        return <Link key={index} to={`/communities/${joinedWords}`} sx={{ fontFamily:"Roboto"}}><Button smallOutlinedButton color="#555555" hoverColor="rgba(0,0,0,0.12)" border='none'>{capitalize(joinedWords)}</Button></Link>
                                    }else{
                                        community = community.toLowerCase()
                                        return <Link key={index} to={`/communities/${community}`} style={{ fontFamily:"Roboto"}}><Button smallOutlinedButton color="#555555" border='none'>{capitalize(community)}</Button></Link>
                                    }
                                })
                            }
                        </Typography>
                    </CardContent>
                    <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                      <Link to="/suggestions"><Button smallOutlinedButton border='none'>Suggestions</Button></Link>
                      <Link to="/advertisement">
                      <Button  smallContainedButton border="none">Advertise</Button>
                      </Link>
                    </CardActions>
                </Card>
            </Paper>
      )
}

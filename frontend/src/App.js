import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Users/components/Navbar";
import Sidebar from "./Users/components/Sidebar";
import Home from "./Users/pages/Home";
import Login from "./Users/pages/Login";
import Community from "./Users/pages/Community";
import Register from "./Users/pages/Register";
import CreatePost from "./Users/pages/CreatePost";
import SinglePost from "./Users/pages/SinglePost";
import UserDashboard from "./Users/pages/UserDashboard";
import UserProfile from "./Users/pages/UserProfile";
import PageNotFound from "./Users/pages/PageNotFound";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";



export default function App() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const username = userInfo?.username;

  const { pathname } = useLocation();
  const communityName = pathname.split("/")[2]

  const communities = [ "Politics", "Science and Tech", "Sports", "Entertainment", "Education", "Business", "Programming", "Love", "Food and Agriculture", "Earth Sustainability", "Gaming", "Culture and Tradition", "Religion", "Humanitarian"]

      let newCommunity = communities.map((community, index) =>{
        if(community.includes(" ")){
            const joinedWords = community.split(" ").join("-").toString().toLowerCase();
            return joinedWords;
          }else{
            community = community.toLowerCase();
            return community;
          }
    })


  return (
    <div className="App">
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={username && UserDashboard} />
          <Route path="/users/:username" component={username && UserProfile || Login} />
          <Route exact path="/communities/:community" component={newCommunity.includes(communityName) && Community} />
          <Route exact path="/communities/:community/create-post" component={newCommunity.includes(communityName) && username && CreatePost || Login} />
          <Route path="/communities/:community/:id" component={newCommunity.includes(communityName) && SinglePost} />
          <Route path="*" component={PageNotFound} />
        </Switch>
    </div>
  );
}

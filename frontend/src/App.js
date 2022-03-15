import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Users/components/Navbar";
import Sidebar from "./Users/components/Sidebar";
import Home from "./Users/pages/Home";
import Login from "./Users/pages/Login";
import Community from "./Users/pages/Community";
import Register from "./Users/pages/Register";
import Box from '@mui/material/Box';
import Post from "./Users/components/CardComponent";
import CreatePost from "./Users/pages/CreatePost";
import SinglePost from "./Users/pages/SinglePost";
import UserDashboard from "./Users/pages/UserDashboard";
import UserProfile from "./Users/pages/UserProfile";


export default function App() {
  return (
    <div className="App">
      <Router>
        {/* <Box sx={{ flexGrow: 1 }}> */}
          <Navbar />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={UserDashboard} />
            <Route path="/users/:username" component={UserProfile} />
            <Route exact path="/communities/:community" component={Community} />
            <Route exact path="/communities/:community/create-post" component={CreatePost} />
            <Route path="/communities/:community/:id" component={SinglePost} />
          </Switch>
        {/* </Box> */}
      </Router>
    </div>
  );
}

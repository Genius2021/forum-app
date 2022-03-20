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
import { useSelector } from "react-redux";


export default function App() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const username = userInfo?.username;



  return (
    <div className="App">
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={username && UserDashboard} />
          <Route path="/users/:username" component={username && UserProfile} />
          <Route exact path="/communities/:community" component={Community} />
          <Route exact path="/communities/:community/create-post" component={username && CreatePost} />
          <Route path="/communities/:community/:id" component={SinglePost} />
        </Switch>
      </Router>
    </div>
  );
}

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Community from "./pages/Community";
import Register from "./pages/Register";
import Box from '@mui/material/Box';
import Post from "./components/CardComponent";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <Route exact path="/:community" component={Community} /> */}
            <Route path="/posts/:id" component={Post} />
            <Route path="/communities/:community" component={Community} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

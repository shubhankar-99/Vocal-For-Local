import "./App.css";
import { HashRouter as Router, Switch } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import LandingPage from "./Components/LandingPage";
import { LoginPrivateRoute } from "./Components/LoginPrivateRoute";
import { PrivateRoute } from "./Components/PrivateRoute";
import UpdateProfile from "./Components/UpdateProfile";
import MyProfile from './Components/MyProfile'
import UploadPost from "./Components/UploadPost";
import DisplayPostCard from "./Components/DisplayPostCard";
import DisplayPostGrid from './Components/DisplayPostGrid';
import Header from './Components/Header';
import './styles/styles.scss'
import AboutUs from "./Components/AboutUs";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <LoginPrivateRoute exact path="/" component={SignIn} />
          <LoginPrivateRoute path="/register" component={SignUp} />
          <Router>
          <Header/>
          <Switch>
           <PrivateRoute path="/landingpage" component={LandingPage} />
           <PrivateRoute path="/update" component={UpdateProfile}/>
           <PrivateRoute path="/profile" component={MyProfile}/>
           <PrivateRoute path="/upload" component={UploadPost}/>
           <PrivateRoute path="/display" component={DisplayPostGrid} />
           <PrivateRoute path="/aboutus" component={AboutUs} />
          </Switch>
          </Router>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;

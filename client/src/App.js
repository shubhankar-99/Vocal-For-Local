import "./App.css";
import { HashRouter as Router, Switch } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { LoginPrivateRoute } from "./Components/LoginPrivateRoute";
import './styles/styles.scss'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <LoginPrivateRoute exact path="/" component={SignIn} />
          <LoginPrivateRoute path="/register" component={SignUp} />
          
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
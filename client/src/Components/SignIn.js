import React, { Component } from "react";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import logo from "../Images/logo.png";
import { LockRounded } from "@material-ui/icons";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Slider from "./Slider";
import {Link} from 'react-router-dom';
import axios from "axios";
import { Redirect } from 'react-router';
import * as LoginLink from "../Constant";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    //state object
    this.state = {
      email: null,
      password: null,
      warning: null,
      redirect:false
    };
  }
  login(e) {
    e.preventDefault();
    //Call API
    if (!this.state.email || !this.state.password) {
      alert("Please Enter all the Details");
    } else {
      const url= LoginLink.Link.baseUrl.LogInUrl;
      axios
        .post(url, {
          email: this.state.email,
          password: this.state.password,
        })
        .then(
          (response) => {
            if (response.data) {
              localStorage.setItem("token", response.data);
              alert("Login Successfull");
              // this.props.nextStep();
              this.setState({
                redirect:true
              })
            } else {
              console.log(response);
              alert("Wrong Username or Password");
            }
          },
          (error) => {
            alert("Something Went Wrong");
          }
        );
    }
  }

  render() {
    if(this.state.redirect)
    {
      return <Redirect push to="/landingpage" />;
    }
    return (
      <div>
        <Grid container style={{ minHeight: "100vh", maxHeight: "100vh" }}>
          <Grid container item xs={12} sm={6} md={8}>
            <Slider />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            alignItems="center"
            direction="column"
            justify="space-between"
            style={{ padding: 10 }}
          >
            <div></div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            >
              <Grid container justify="center">
                <img src={logo} width={100} height={90} alt="logo" />
              </Grid>
              <br /> <br />
              <TextField
                label="Email"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
              />
              <TextField
                label="Password"
                margin="normal"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
              <div style={{ height: 20 }} />
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => this.login(e)}
              >
                Sign In
              </Button>
              <div style={{ height: 20 }} />
              <Button
                variant="outlined"
                
              >
              <Link to="/register" style={{ textDecoration: 'none',color:'black',width:'100%' }}>
                Don't have an Account? Sign Up
                </Link>
              </Button>
            </div>

            <div />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SignIn;
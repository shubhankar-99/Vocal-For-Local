import React, { Component } from "react";
import "./AboutUs.module.css";
import code from "../Images/code.png";
import Shubhankar from '../Images/Shubhankar.jpg';
import Nikhil from '../Images/Nikhil.jpeg';
import Dheeraj from '../Images/Dheeraj.jpeg';

class AboutUs extends Component {
  render() {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <div class="container">
          <div style={{ margin: "0", padding: "0" }}>
            <img src={code} style={{ height: "30vh", width: "100%" }}></img>
          </div>
          <div>
            <br />
          </div>

          <div className="row">
            <div className="col-md-4" style={{ marginBottom: "20px" }}>
              <div className="card text-center shadow">
                <div className="overflow">
                  <img src={Dheeraj} alt="Image" className="card-img-top" style={{height:"400px"}}/>
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">Dheeraj Maurya</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow">
                <div className="overflow">
                  <img src={Nikhil} alt="Image" className="card-img-top" style={{height:"400px"}}/>
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">Nikhil Chopra</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow">
                <div className="overflow">
                  <img src={Shubhankar} alt="Image" className="card-img-top" style={{height:"400px"}}/>
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">Shubhankar Saxena</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AboutUs;

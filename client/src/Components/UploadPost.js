import React, { Component } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router';
import "./UploadPost.css";
import axios from "axios";
import * as UploadPostLink from "../Constant";
import * as StateCity from '../StateCity';
import imageCompression from 'browser-image-compression'

import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';


export class UploadPost extends Component {
  state = {
    profileImg: null,
    profileImgUrl:"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
    title: null,
    description: null,
    
    redirect:false,
    state: StateCity.state.states[0],
    city: "",

    cropProcess:0,

    croppedImgUrl:null,
    crop: {
      unit: 'px', 
      x: 50,
      y: 50,
      width: 300,
      aspect: 16/9
    }
  };
  
  handleChangeState = (e) => {
    console.log(e.target.value)
    this.setState({State: e.target.value.state });
  };
  
  handleChangeCity = (e) => {
    this.setState({ city: e.target.value });
  };

   imageHandler = async (image) => {
    var options = {
      maxSizeMB: 0.2
    }
    const output = await imageCompression(image, options)
    this.setState({profileImg:output})
    this.setState({profileImgUrl:URL.createObjectURL(output)})

  };

  handleCropImage = async (e) => {
    const image = e.target.files[0]
    this.setState({
      cropProcess:1,
      profileImg:image,
      croppedImgUrl:URL.createObjectURL(image)
    })
  }

  onCropChange = (crop) => {
    this.setState( () =>{
     return {crop:crop} 
    });
    this.getCroppedImg(crop);
  }

  onCropComplete =  crop  => {
      this.setState({cropProcess:2});
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
            
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let profileImg = new File([u8arr], filename, {type:mime});
    this.imageHandler(profileImg)
  }

  getCroppedImg( crop) {
  const image = new Image()
  image.src = this.state.croppedImgUrl 
  // const aspect  = this.state.aspect
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.width*0.5625 ;
  const ctx = canvas.getContext("2d");
  
  // console.log(crop)

  ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.width  * scaleY*0.5625 ,
      0,
      0,
      crop.width,
      crop.width *0.5625
   );
  
  const reader = new FileReader()
  canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
          this.dataURLtoFile(reader.result, 'cropped.jpg')
      }
    })
  } 

  submit = (e) => {
      
    if( !this.state.profileImg || !this.state.profileImgUrl || !this.state.title || !this.state.description ){
      alert("Please Enter all the Information");
    }
    else {
      let formData = new FormData();
      
      if (this.state.profileImg !== null)
        formData.append('media',this.state.profileImg)
      
      if (this.state.title !== null)
        formData.append('title',this.state.title)
      
      if (this.state.description !== null)
        formData.append('description',this.state.description)

      if (this.state.city !== "") {
        formData.append("ownerState", this.state.state.name);
        formData.append("ownerCity", this.state.city);
      }
      
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      };
      const url = UploadPostLink.Link.baseUrl.UploadPostUrl

      axios
        .post(url, formData , config)
        .then((response) => {
          this.setState({
            redirect:true
          })
          alert('Successfull');
        })
        .catch((error) => {
          console.log(error);
        });
      }
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { profileImgUrl , profileImg , title, description , state , city , cropProcess ,crop,croppedImgUrl} = this.state;
    console.log(cropProcess)
    if(this.state.redirect)
    {
      return <Redirect push to="/landingpage" />;
    }
    else if(cropProcess == 1){
      return (
      <div>
      {console.log("Hello")}
      <ReactCrop
                  src={croppedImgUrl} 
                  crop = {crop}
                  onChange={this.onCropChange}
      /> 
                 
          <Button
          color="primary"
          variant="contained"
          onClick={this.onCropComplete }
          >
          Crop
      </Button>
    </div>
      )
    } 
    else{
    return (
      <div className="Updatepage">
        <div className="Updatecontainer">
          <h1 className="Updateheading">
            Hola!! Don't Hesitate to Post for Locals Near You
          </h1>
          <div style={{ height: 20 }} />
          <div style={{ height: 20 }} />
          
          <TextField
            className="TextField"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(event) => {
                  this.setState({ title: event.target.value });
            }}
          />
     
         

          <div style={{ height: 20 }} />

          <div className="Updateimg-holder1">
            <img src={profileImgUrl} alt="" id="Updateimg1" className="Updateimg1" />
          </div>
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="Updateinput"
            onChange = {this.handleCropImage} 
          />
          <div className="Updatelabel1">
            <Button variant="contained">
              <label className="Updateimage-upload" htmlFor="Updateinput">
                Attatch a Pic for Support
              </label>
            </Button>
          </div>
          <div style={{ height: 20 }} />
          <TextField
            className="TextField"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={5}
            onChange={(event) => {
                  this.setState({ description: event.target.value });
            }}
          />
          <div style={{ height: 20 }} />

              <TextField
                className="TextField"
                id="outlined-basic"
                label="State"
                variant="outlined"
                
                select
                onChange={this.handleChange("state")}
              >
                {StateCity.state.states.map((state, index) => (
                  <MenuItem  key={state.id} value={state}>
                    {" "}
                    {state.name}{" "}
                  </MenuItem>
                ))}
              </TextField>
              <div style={{ height: 20 }} />
              <TextField
                className="TextField"
                id="outlined-basic"
                label="City"
                variant="outlined"
                
                select
                onChange={this.handleChange("city")}
              >
                {this.state.state.districts.map((city, index) => (
                  <MenuItem key={city.id} value={city.name}>
                    {" "}
                    {city.name}{" "}
                  </MenuItem>
                ))}
              </TextField>
          
          <div style={{ height: 20 }} />
          {/* <Button
            color="primary"
            variant="contained"
            onClick={(e) => this.submit(e)}
            style={{ width: "450px" }}
          >
            Upload
          </Button> */}

          <Grid
            container
            item
            // xs={12}
            // sm={6}
            // md={4}
            alignItems="center"
            direction="column"
            justify="space-between"
            style={{ padding: 10 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            ></div>
          </Grid>

          
               {/* <TextField        className="TextField"
                                 id="outlined-basic"
                                 label="State"
             	                  variant="outlined"
                               style={{width:"550px"}}
                 select
                 onChange={this.handleChangeState}
               >
                 {(StateCity.state.states).map((state, index) =>
             <MenuItem key={state.id} value={state}  > {state.name} </MenuItem>
           )}
               </TextField>
               <div style={{ height: 20 }} />
               <TextField
                 className="TextField"
                 id="outlined-basic"
                 label="City"
                 variant="outlined"
                 style={{width:"550px"}}
                 select
                 onChange={this.handleChangeCity}
               >
                 {(this.state.State.districts).map((city, index) =>
             <MenuItem key={city.id} value={city.name}  > {city.name} </MenuItem>
           )}
               </TextField> */}
               <Grid
            container
            item
            // xs={12}
            // sm={6}
            // md={4}
            alignItems="center"
            direction="column"
            justify="space-between"
            style={{ padding: 10 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            ></div>
          </Grid>
               <Button
            color="primary"
            variant="contained"
            onClick={(e) => this.submit(e)}
            className="UploadPostButton"
          >
            Upload
          </Button>
          <div style={{ height: 20 }}/>
        </div>
      </div>
    );
  }
}
}

export default UploadPost;
import React, { useState,useCallback } from "react";
import "./Slider.scss";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ImgComp from "./ImgComp";
import sideImage1 from "../Images/1.jpg";
import sideImage2 from "../Images/2.jpg";
import sideImage3 from "../Images/3.jpg";
import sideImage4 from "../Images/4.jpg";
import sideImage5 from "../Images/5.jpeg";
// import sideImage6 from "./images/6.jpeg";

function Slider() {
  //  create an array  for component to show inside the slider
  //  Add components to the array
  let sliderArr = [
    <ImgComp src={sideImage1} />,
    <ImgComp src={sideImage2} />,
    <ImgComp src={sideImage3} />,
    <ImgComp src={sideImage4} />,
    <ImgComp src={sideImage5} />,
  ];
  const [x, setX] = useState(0);

  const goLeft = () => {
    //sliderArr.length is the number of images
    // This is step is done so that after last value it comes back to first
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  };
//   const makeTimer = useCallback(() => {
//     setInterval(() => { 
//         x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
//       }, 3000)
//   },[]);
//   makeTimer()
  return (
    <div className="slider">
      {sliderArr.map((item, index) => {
        return (
          <div
            key={index}
            className="slide"
            style={{ transform: `translateX(${x}%)` }}
          >
            {item}
          </div>
        );
      })}
      {/*  add two buttons to navigate */}
      <button id="goLeft" onClick={goLeft}>
        <ArrowBackIosIcon style={{ fontSize: 40, color: "whitesmoke" }} />
      </button>
      <button id="goRight" onClick={goRight}>
        <ArrowForwardIosIcon style={{ fontSize: 40, color: "whitesmoke" }} />
      </button>
    </div>
  );
}

export default Slider;

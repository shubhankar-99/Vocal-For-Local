import React,{useState,useEffect} from 'react'
import axios from "axios";
import './MyProfile.css';
import * as MyProfileLink from "../Constant";

function MyProfile() {

  const [user,setUser]= useState({});
  const [ImageUrl,setImageUrl] = useState(null);
  const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const url = MyProfileLink.Link.baseUrl.MyProfileUrl
        const authAxios = axios.create({
            baseURL: url,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
         
         const setProfileImage = (buffer) => {
            var binary = '';
            var bytes = new Uint8Array( buffer );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
          }
            const image =  "data:image/png;base64," + window.btoa( binary );
            setImageUrl(image)
          }

          const fetchData = async () => {
            try {
              const result = await authAxios.get();
              setUser(result.data)
              setLoading(false);
              if(!!result.data.avatar) setProfileImage(result.data.avatar.data)
            }
            catch (error) {
              console.log(error);
            }
          }

          fetchData();
          
    },[])
    
    let getAge = (age) => {
      if (age) return <p>{age} Years Old</p>
    }

    let getLocation = ( location ) => {
      if(location) return <p>From {location}</p> 
    }

    return loading ? (
      <h1> Loading... </h1>
    ) :(
        <div className="ProfileDiv">
        <h1 className="ProfileHeader">My Profile</h1>
        <br/>
        
        <img src={ ImageUrl } 
        className="ProfileImage" alt='profileImg'></img>
        <br/> <br/>
        <div className="ProfileName">
           {user.firstname +" "+ user.lastname}
            </div>
            <br/>
            <div className="ProfileAge">
            {getAge(user.age)}
            <br/>
            {user.email}
            <br/>

            
            
            From {user.city + "," + user.state}

            <br/>
            {user.sex}
            </div>
            

        </div>
    )
}

export default MyProfile

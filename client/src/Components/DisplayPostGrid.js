import React,{useState,useEffect} from "react";
import DisplayPostCard from "./DisplayPostCard";
import axios from 'axios';
import * as MyBlogsLink from "../Constant";

const DisplayPostGrid = ({url=''}={}) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    
    const url = MyBlogsLink.Link.baseUrl.MyPostsUrl;
    const authAxios = axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const fetchData = async () => {
      try {
        const result = await authAxios.get();
        setItems(result.data)
        setIsLoading(false)
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])


  return isLoading ? <h1>Loading...</h1>: (
    <section className="cards" style={{backgroundColor:"black",padding:'1.6rem'}}>
    <br/><br/>
    <h1 style={{color:'white'}}>List Of Your Posts</h1>
    <br/>
    {items.map(item => (
      <DisplayPostCard
      key={item._id}
      item={item}
      
      >
      </DisplayPostCard>
      
    ))}
    </section>
  );
};
export default DisplayPostGrid

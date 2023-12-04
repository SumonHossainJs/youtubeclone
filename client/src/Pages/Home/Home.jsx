import "./Home.scss";
import {Card,Loading} from '../../Components/index.js';
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {
  const [videos, setvideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try{
        const res = await axios.get(`http://localhost:5030/video/random`);
        setvideos(res.data);
      }catch(err){
        console.error("Error Fetching",err);
      }finally{
        setLoading(false);
      }
      
    };
    fetchVideos();
  }, []);

  return (
    <div className='videoShowcase'>
       {loading ? (
        <Loading /> // Render loading component while fetching data
      ) : (
        videos.map((video) => (
          <Card key={video._id} video={video} type={"bigeee"} />
        ))
      )}
    </div>
  )
}

export default Home
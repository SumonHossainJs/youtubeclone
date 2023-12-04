import { useEffect, useState } from "react";
import "./Comment.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";


const Commet = ({videoId}) => {
  const currentUser = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);


  useEffect(()=>{
    const getComments = async () =>{
      try{
       const res = await axios.get(`http://localhost:5030/comment/${videoId}`);
       setComments(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getComments();
  },[videoId]);

  useEffect(()=>{
    try{
      
    }catch(err){
      next(err);
    }
  },[comments.userId]);

  return (
    comments.map(comment =>(
      <SingleCommnet key={comment._id} comment={comment}/>
    )) 
  )
}


 const SingleCommnet = ({comment}) =>{
  const [commentedUser, setCommentedUser] = useState()

  useEffect(()=>{
    const fetchUser = async () =>{

      try{
        const cRes = await axios.get(
          `http://localhost:5030/user/find/${comment.userId}`
        );
        setCommentedUser(cRes.data);
        
      }catch(err){
        next(err);
      }
    }
    fetchUser();
  },[comment.userId]);
  return(
    <div className="comment-con">
      <div className="img-con">
        <img src={commentedUser?.img} alt="" />
      </div>
      <div className="c-desc">
        <div className="top">
          <span className="userName">{commentedUser?.name}</span>
          <span className="date">{format(comment.createdAt)}</span>
        </div>
        <div className="desc">
          {comment.desc}
        </div>
      </div>
    </div>
  )
 }

export default Commet
import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector } from 'react-redux';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PostsDiv = (props) => {
  const currentUser = useSelector(state=>state.currentUser);
  const notifyCollection = collection(db,"notices");
  const [comment,setComment] = useState(false);
  const [text,setText] = useState("");

  const handleLike=async()=>{
    const docRef = doc(db,"posts",props.state.id);
    const likeNumber = props.state.like;
      await updateDoc(docRef,{
        like : likeNumber+1
      })
      await addDoc(notifyCollection,{
        date : serverTimestamp(),
        msg : `${currentUser.displayName} liked ${props.state.title}`
      })
  }

  const handleComments = async()=>{
    const docRef = doc(db,"posts",props.state.id);
    await updateDoc(docRef,{
      comments : arrayUnion({
        msg : `${currentUser.displayName} commented ${text}`
      })
    })

    await addDoc(notifyCollection,{
      date : serverTimestamp(),
      msg : `${currentUser.displayName} commented on ${props.state.title}`
    })
  }

  const date = props.state.date?.seconds ? new Date(props.state.date.seconds * 1000) : null;
  const formattedTime = date ? date.toLocaleTimeString() : null;

  return (
    <div className='postsDiv'>
      {/* <div className="postsContainer"> */}
      <div className="userInfo">
      {/* <img src="https://htmldemo.net/adda/adda/assets/images/profile/profile-35x35-1.jpg" alt="" />
      */}
      <img src={currentUser?.photoURL!=undefined ? currentUser.photoURL : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="" />
        <div>
          <span>{props.state.userName}</span>
          {/* <p>{props.state.date?.seconds}</p> */}
          <p>{formattedTime}</p>
        </div>
      </div>
      <div className="title">{props.state.title}</div>
      <div className="desc">{props.state.desc}</div>
      <div className="content">
        {
          props.state.type=="image" && <img src={props.state.content} alt="" />
        }
        {
          props.state.type=="video" && <video src={props.state.content} controls={true}></video>
        }
      </div>
      <div className="footer">
        {props.state.like}<FavoriteBorderIcon className='heart' style={{color:"#DC4734",cursor:"pointer"}} onClick={handleLike}/>
        <CommentIcon style={{color:"#DC4734",cursor:"pointer"}} className='comment' onClick={()=>setComment(!comment)}/>
      </div>
      <div className={`commetsDiv ${comment && "display"}`}>
      <input type="text" name="" id="" placeholder='type comment...' value={text} onChange={(e)=>setText(e.target.value)}/>
      <button onClick={handleComments}>add</button>

        {
          props.state.comments?.map((ele)=>{
            return <h6>{ele.msg}</h6>
          })
        }
      </div>
      {/* </div> */}
    </div>
  )
}

export default PostsDiv
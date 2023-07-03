import React, { useEffect, useState } from 'react'
import "../Styles/Homepage.scss"
import Navbar from '../components/Navbar'
import ProfileDiv from '../components/ProfileDiv'
import PostsDiv from '../components/PostsDiv'
import NotifyDiv from '../components/NotifyDiv'
import AddPost from '../components/AddPost'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { Empty } from 'antd';

const Homepage = () => {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const collectionRef = collection(db,"posts");
    const q = query(collectionRef,orderBy("date","desc"));
    onSnapshot(q,snapShot=>{
      setPosts([])
      snapShot.forEach((doc)=>{
        doc.exists() && setPosts((prev)=>{return [...prev , doc.data()]});
      })
    })
     
        
  },[])
  
  return (
    <div className='home'>
      
        <Navbar />
        <div className="container">
            <ProfileDiv />
            <div className="allPosts">
              {
                posts.length>0 ? <>
                {
                posts?.map((ele,index)=>{
                  return <PostsDiv key={index} state={ele}/>
                })
              }
                </> 
                : 
                <Empty />
              }
            </div>
            <NotifyDiv />
        </div>
        <AddPost />
    </div>
  )
}

export default Homepage
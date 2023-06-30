import React, { useEffect, useState } from 'react'
import "../Styles/Homepage.scss"
import Navbar from '../components/Navbar'
import ProfileDiv from '../components/ProfileDiv'
import PostsDiv from '../components/PostsDiv'
import NotifyDiv from '../components/NotifyDiv'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPost from '../components/AddPost'
import { postCollection } from '../firebase'
import { getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'

const Homepage = () => {
  const [posts,setPosts] = useState([]);
  // const qry=query(postCollection);
  useEffect(()=>{
   
      
  //     // const docs = await getDocs(qry);
  //     // let arr=[]
  //     // docs.forEach((doc)=>{
  //     //   arr.push(doc.data())
  //     //   console.log(doc.data())
  //     // })
    

    

    const unsub = onSnapshot(postCollection,(doc)=>{
      doc.forEach((doc)=>{
      //  console.log("printing",doc.data());
        doc.exists() && <>
        {
          (!posts.includes(doc.data())) && setPosts((prev)=>{
            console.log("item");
            return [
              
              ...prev,
              doc.data()
            ]
          })
        }
        </>
        // doc.exists() && console.log(doc.data());
      })
    });

    return ()=>{
      unsub();
    }
  
  },[])
  console.log(posts);
  return (
    <div className='home'>
      
        <Navbar />
        <div className="container">
            <ProfileDiv />
            {/* <PostsDiv /> */}

            {
              posts.map((ele)=>{
                return <PostsDiv state={ele} />
              })
            }
            <NotifyDiv />
        </div>
        <AddPost />
    </div>
  )
}

export default Homepage
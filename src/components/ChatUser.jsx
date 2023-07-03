import { collection, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setChatValue } from '../slices/chatSlice';

const ChatUser = (props) => { 
  const currentUser = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();
    const handleClick=async()=>{
      const user = props.state;
      const combinedId = currentUser.uid > user?.uid ? currentUser.uid + user?.uid : user?.uid + currentUser.uid;
        
      try {
          const docRef = doc(db, "chats", combinedId);
          const res = await getDoc(docRef);

          if (!res.exists()) {
              await setDoc(doc(db, "chats", combinedId), {
                  messages: []
              });
              
              // const washingtonRef = doc(db, "userChats", currentUser.uid);
              // await updateDoc(washingtonRef, {
              //     [combinedId + ".userInfo"]: {
              //         uid: user?.uid,
              //         displayName: user?.displayName,
              //         photoURL: user?.photoURL
              //     },
              //     [combinedId + ".date"]: serverTimestamp()
              // });
              // const databaseRef = doc(db, "userChats", user?.uid);
              // await updateDoc(databaseRef, {
              //     [combinedId + ".userInfo"]: {
              //         uid: currentUser.uid,
              //         displayName: currentUser.displayName,
              //         photoURL: currentUser.photoURL
              //     },
              //     [combinedId + ".date"]: serverTimestamp()
              // });
              
          }
      } catch (err) {
          console.log("error while selecting!", err);
      }

      dispatch(setChatValue({combinedId,user}));
    }
  return (
    <div className='userChat' onClick={handleClick}>
        <img src={props.state.photoURL ?props.state.photoURL : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="" />
        <div className="details">
            <p className='p1'>{props.state.displayName}</p>
            <p>{props.state.status}</p>
        </div>
    </div>
  )
}

export default ChatUser
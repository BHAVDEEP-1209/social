import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import {v4 as uuid } from "uuid";
import SendIcon from "@mui/icons-material/Send";
const Input = () => {
   const currentUser = useSelector(state=>state.user.currentUser);
   const [text, setText] = useState("");
   const chatId = useSelector(state=>state.chat.chatId);
    const handleSend = async () => {
    
       if(text){
        const dRef = doc(db, "chats", chatId);
        await updateDoc(dRef, {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            status : false
          })
        })
        setText("");
       }
    }

    const handleKey=(e)=>{
      e.code=="Enter" && handleSend();
    }
  return (
    <div className='sendDiv'>
        <input type="text" onChange={(e)=>setText(e.target.value)} value={text} placeholder='Type to chat...' onKeyDown={handleKey}/>
        <div>
            <SendIcon className="sendIcon" onClick={handleSend}/>
        </div>
    </div>
  )
}

export default Input
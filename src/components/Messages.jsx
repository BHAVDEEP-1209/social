
import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux';
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const chatId = useSelector(state => state.chat.chatId);
    const chatUser = useSelector(state => state.chat.chatUser);
    const currentUser = useSelector(state=>state.user.currentUser);
    const dbRef = doc(db, "users", currentUser.uid);

    useEffect(() => {
        if (chatId) {
            const dbRef = doc(db, "chats", chatId);
            const unsub = onSnapshot(dbRef, (doc) => {
                doc.exists && setMessages(doc.data()?.messages)
            });

            return () => {
                unsub();
            }
        }
    }, [chatId]);

    const clearChat=async()=>{
        const dRef = doc(db, "chats", chatId);
        await updateDoc(dRef, {
          messages: []
        })
    }
  
    return (
        <>
        <div className={`messages ${chatUser?.uid==undefined && "fullHeight"}`} >
           {
            chatUser.uid!=undefined && <DeleteIcon className='deleteIcon' onClick={clearChat}/>
           }
            {
                messages?.map((m,i)=>{
                    return <Message message={m} key={m.id} index={i}/>
                })
            }
        </div>
        
        </>
    )
}

export default Messages
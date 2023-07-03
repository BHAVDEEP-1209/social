import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import "../Styles/Chat.scss"
import ChatUser from '../components/ChatUser';
import { useSelector } from 'react-redux';
import Input from '../components/Input';
import Messages from '../components/Messages';
import CircleIcon from "@mui/icons-material/Circle";

const Chat = () => {
    const [users,setUsers] = useState([]);
    const currentUser = useSelector(state=>state.user.currentUser);
    const chatId = useSelector(state=>state.chat.chatId);
    const chatUser = useSelector(state=>state.chat.chatUser);
    useEffect(()=>{
        const q = query(collection(db,"users"),where("uid", "!=", currentUser.uid));
        onSnapshot(q,snap=>{
            setUsers([]);
            snap.forEach((ele)=>{
                ele.exists() && setUsers((prev)=>{
                    return [
                        ...prev,
                        ele.data()
                    ]
                })
            })
        })
    },[])

    const [status,setStatus] = useState("");
  
    useEffect(()=>{
      const getStatus=async()=>{
         if(chatUser?.uid!=undefined){
          const dbRef = doc(db, "users", chatUser?.uid);
          const unsub = onSnapshot(dbRef, (doc) => {
            setStatus(doc.data()?.status);
          });
  
          return () => {
              unsub();
          }
         }
      }
  
      getStatus();
    },[chatUser])
  
  return (
    <div>
        <Navbar />
        <div className="chatsDiv">
            <div className="usersDiv">
                <h1>Users</h1>
                   {
                     users.map((ele,index)=>{
                        return <ChatUser state={ele} id={index} key={index}/>
                     })
                   }
            </div>
            <div className="chatDiv">
                   <div className="header"><span>{chatUser.displayName}</span>
                   {
                    chatUser.uid!=undefined && <CircleIcon className={`${status=="online" ? "chatIcon" : "chatIcon2"}`} />
                   }
                   </div>
                   <div className="chats">
                    <Messages />
                   </div>
                   <div className="footer">
                    <Input />
                   </div>
            </div>
        </div>
    </div>
  )
}

export default Chat
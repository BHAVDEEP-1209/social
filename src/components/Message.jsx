
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getDate } from './SenderComponent';
import "../Styles/Message.scss"

const Message = ({ message, index }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const ref = useRef();
  let mydate = 'T';


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message]);


  // TimeStamp
  const date = message?.date?.seconds ? new Date(message.date.seconds * 1000) : null;
  const formattedTime = date ? date.toLocaleTimeString() : null;
  let d = getDate(message.date.seconds);
  if (d != mydate && index != 0) mydate = d;
  return (
    <>
      <div>

        {
          mydate === d ? "" : <p>{d}</p>
        }

        <div ref={ref} className={`message ${message.senderId == currentUser.uid && "owner"}`}>
          <div className="messageInfo">
            <img src="https://images.unsplash.com/photo-1687561114607-4828b9997897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=374&q=80" alt="" />
            <span>{formattedTime}</span>
          </div>
          <div className="messageContent">
            <p>{message.text}</p>
          </div>
        </div>
      </div>
    </>


  )
}

export default Message
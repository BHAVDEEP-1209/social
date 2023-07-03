import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Notify from './Notify';

const NotifyDiv = () => {
  const [notices,setNotices] = useState([]);
  useEffect(()=>{
    const q = query(collection(db,"notices"),orderBy("date","desc"));
    onSnapshot(q,snapShot=>{
      setNotices([]);
      snapShot.forEach((doc)=>{
        doc.exists() && setNotices((prev)=>{
          return [
            ...prev,
            doc.data()
          ]
        })
      })
    })
  },[])
  return (
    <div className='notifyDiv'>
      <div className="header">
        <span>Notifications</span>
        <hr className='hr'/>
      </div>
      <div className="notices">
        {
          notices.length>0 ? <>{
            notices.map((ele)=>{
              return <Notify state={ele}/>
            })
          }
          </>

          : 

          <span className='noNotify'>no notifications 's yet</span>
        }
      </div>
    </div>
  )
}

export default NotifyDiv
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { auth, db, postCollection, storage } from '../firebase';
import {v4 as uuid} from "uuid";
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { useSelector } from 'react-redux';

const AddPost = () => {
  const [open, setOpen] = useState(false);
  const [imgUrl,setImgUrl] = useState(""); 
  const currentUser = useSelector(state=>state.currentUser);

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const file = e.target[0].files[0];
    const description = e.target[1];
    const storageRef = ref(storage, `files/${file.name + uuid()}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
      }, 
      ()=> {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
          addDoc(postCollection,{
            uploadBy : currentUser.displayName,
            content : downloadURL,
            date : serverTimestamp(),
            like : 0,
            comment : 0,
            // desc : description,
          })
        });
      }
    );


      setOpen(false);

}

  return (
    <>
      
      <AddCircleIcon className='addIcon' onClick={() => setOpen(true)}/>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[]}
      >
        <form action="" onSubmit={handleSubmit}>
        <input type="file"/>
        <input type="text" id=""/>
        <button type="submit">submit</button>
        </form>
        
      </Modal>
    </>
  );
};

export default AddPost;
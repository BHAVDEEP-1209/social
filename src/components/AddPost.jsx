import React, { useState } from 'react';
import { Modal } from 'antd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {db, storage} from "../firebase.js"
import {v4 as uuid} from "uuid";
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import ContentRadio from './ContentRadio.jsx';
import "../Styles/AddPost.scss"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Loader from './Loader.jsx';
// import { useSelector } from 'react-redux';

const AddPost = () => {
  const [open, setOpen] = useState(false);
  const collectionRef = collection(db ,"posts");
  const currentUser = useSelector(state=>state.currentUser);
  const [formValues,setFormValues] = useState({ type : "image", desc : "",title : ""});
  const [loading,setLoading] = useState(false);
  // const [imgUrl,setImgUrl] = useState(""); 

  const handleSubmit =async (e)=>{
    e.preventDefault();
    setLoading(true);
    const file = e.target[0].files[0];
    const description = e.target[1].value;
    const imageRef = ref(storage , `images/${uuid()}`);
    await uploadBytes(imageRef,file).then((snap)=>{
      console.log("file uploaded!");
    })

    await getDownloadURL(imageRef).then(async(url)=>{
      const id = uuid();
      const docRef = doc(db,"posts",id);
      await setDoc(docRef,{
        id : id,
        content : url,
        desc : description,
        date : serverTimestamp(),
        like : 0,
        userName : currentUser.displayName,
        type : formValues.type,
        comments : [],
        title : formValues.title
      })
    })
    setFormValues({type: "image"});
    setLoading(false);
      setOpen(false);

}

  return (
    <>
      
      <AddCircleIcon className='addIcon' onClick={() => setOpen(true)}/>
      <Modal
        title="Add Post!"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
        footer={[]}
      >
        <div className="postFormContainer">
        <div className="postForm">
        <form action="" onSubmit={handleSubmit} className='form'>
          <div className="header">
          <img src="https://htmldemo.net/adda/adda/assets/images/logo/logo.png" alt="" />
          <span>ADD POST</span>
          </div>
          {
            loading && <Loader />
          }
        <label htmlFor="file" className='imgLabel'>
            <AddPhotoAlternateIcon className='icon' />
            <span>Upload File</span>
          </label>

        <input type="file" className='content' id="file"/>
        <input type="text" id="" className='text' placeholder='Type Title...' value={formValues.title} onChange={(e)=>setFormValues((prev)=>{return {...prev,title : e.target.value}})}/>

        <input type="text" id="" className='text' placeholder='Type description...' value={formValues.desc} onChange={(e)=>setFormValues((prev)=>{return {...prev,desc : e.target.value}})}/>

        <ContentRadio state={{formValues,setFormValues}}/>
        <button type="submit" >submit</button>
        </form>
        </div>
        </div>
        
      </Modal>
    </>
  );
};

export default AddPost;
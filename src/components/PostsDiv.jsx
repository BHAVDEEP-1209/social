import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

const PostsDiv = (props) => {
  return (
    <div className='postsDiv'>
      <div className="postsContainer">
      <div className="userInfo">
      <img src="https://htmldemo.net/adda/adda/assets/images/profile/profile-35x35-1.jpg" alt="" />
        <div>
          <span>Bhavdeep Kaushal</span>
          <p>10:30AM</p>
        </div>
      </div>
      <div className="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit repellat quidem nihil. Expedita sequi at ducimus facilis. Dignissimos iusto voluptatem laboriosam ipsam perspiciatis ratione! Nesciunt vero obcaecati placeat veniam tempora!</div>
      <div className="content">
        <img src="https://images.unsplash.com/photo-1682687220866-c856f566f1bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
      </div>
      <div className="footer">
        <FavoriteBorderIcon className='heart' style={{color:"#DC4734" }} />
        <CommentIcon style={{color:"#DC4734" }} className='comment'/>
      </div>
      </div>
    </div>
  )
}

export default PostsDiv
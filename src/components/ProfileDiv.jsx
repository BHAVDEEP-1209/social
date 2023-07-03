import React from 'react'
import { useSelector } from 'react-redux'

const ProfileDiv = () => {
  const currentUser = useSelector(state=>state.user.currentUser);
  return (
    <div className='profileDiv'>
      <img src="https://htmldemo.net/adda/adda/assets/images/banner/banner-small.jpg" alt="" />
      <div className="details">
        <span>{currentUser.displayName}</span>
        <p>Any one can join with but Social network us if you want Any one can join with us if you want</p>
      </div>
      {/* <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" className='profileImg'/> */}
    </div>
  )
}

export default ProfileDiv
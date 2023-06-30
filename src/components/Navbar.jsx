import React from 'react'
import "../Styles/Navbar.scss"
import ProfileButton from './ProfileButton'

const Navbar = () => {
  return (
    <div className='nav'>
        <div className="left">
            <span>Home</span>
            <span>Message</span>
            <span>Notification</span>
        </div>
        <div className="mid">
            <img src="https://htmldemo.net/adda/adda/assets/images/logo/logo.png" alt="" />
        </div>
        <div className="right">
            {/* <img src="https://htmldemo.net/adda/adda/assets/images/profile/profile-35x35-1.jpg" alt="" /> */}
            <ProfileButton />
        </div>
    </div>
  )
}

export default Navbar
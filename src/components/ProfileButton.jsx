import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { handleLogOut } from '../slices/userSlice';
import { handleChatLogOut } from '../slices/chatSlice';

export default function ProfileButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state=>state.user.currentUser);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async()=>{
    handleClose();
    dispatch(handleChatLogOut());
    dispatch(handleLogOut());
    navigate("/");
    await updateDoc(doc(db, "users", currentUser.uid), {
      status : "offline"
    });
    
}

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {/* <img src="https://htmldemo.net/adda/adda/assets/images/profile/profile-35x35-1.jpg" alt="" /> */}
        {
          <img src={currentUser?.photoURL ? currentUser.photoURL : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="" className='navImg'/>
        }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={()=>navigate("/profile")}>Profile</MenuItem> */}
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
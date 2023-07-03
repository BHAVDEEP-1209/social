import React from 'react'

const Notify = (props) => {
  return (
    <div className='notify'>
        <img src={props.state.img} alt="" />
        <div className="notifyDetails">
            <span>{props.state.msg}</span>
        </div>

    </div>
  )
}

export default Notify
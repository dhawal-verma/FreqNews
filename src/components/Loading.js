import React from 'react'
import loading from './loading-bar.gif'
const Loading =()=> {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading"></img>
      </div>
    )
}

export default Loading
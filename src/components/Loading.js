import React, { Component } from 'react'
import loading from './loading-bar.gif'
export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading"></img>
      </div>
    )
  }
}

import React, { Component } from 'react'

export default class News extends Component {
  render() {
    let {title,description,imgUrl,newsUrl} = this.props;
    return (
        <div>
              <div className="card my-3" style={{width: "18rem"}}>
              <img src={imgUrl} class="card-img-top" alt="..."/>
              <div class="card-body"> 
                <h5 class="card-title">{title}...</h5>
                <p class="card-text">{description}...</p>
                <a href={newsUrl?newsUrl:null} rel="noreferrer" target="_blank" class="btn btn-sm btn-primary">Read More..</a>
              </div>
            </div>  
        </div>
    )
  }
}

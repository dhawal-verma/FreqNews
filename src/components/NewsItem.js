import React, { Component } from 'react'

export default class News extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,time,author,source} = this.props;
    return (
      <div className="my-3">
              <div className="card my-3" style={{width: "18rem"}}>
                <div style={{display :'flex',
              justifyContent:'flex-end',
              position:'absolute',right:'0'}}>
                  <span className="badge rounded-pill bg-dark" style={{left:'80%',zIndex:'1'}}>{source}</span>
                </div>
              
              <img src={imgUrl} className="card-img-top" alt="..."/>
              <div className="card-body"> 
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <div className="card-footer" style={{padding:"0px"}}>
        <small className="text-muted" >By Author:{author?author:"Unknown"}<br></br>{new Date(time).toGMTString()}</small>
      </div>
                <a href={newsUrl?newsUrl:null} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More..</a>
              </div>
            </div>  
        </div>
    )
  }
}

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
export default class News extends Component {

  article=[]
    static defaultProps = {
        country : 'in',
        pageSize: 8,
        category:'genaral'

      }
      static propTypes={
        pageSize : PropTypes.number,
        country : PropTypes.string,
        category :PropTypes.string
      }
    constructor(){
        super()
        this.state = {article : this.article,
        loading:false,
        page : 1,
        totalResults : 0
        }
    }

    async componentDidMount()
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            article:parsedData.articles,
            totalResults : parsedData.totalResults,
            loading:false
        })
    }
    handlePrevClick =async ()=>{
        // console.log("Prev")
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page : this.state.page-1,
            article:parsedData.articles,
            loading:false
        })
    }
    handleNextClick =async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page : this.state.page+1,
            article:parsedData.articles,
            loading:false
        })
    }
  render() {
    return (
      <div className="container my-3">
        <h2 className='text-center'>FreqNews Top Heading</h2>
        {this.state.loading && <Loading/>}
        <div className="row">
            {!this.state.loading && this.state.article.map((element)=>
            {
               return <div className='col-md-4' key={element.url}>
                <NewsItem imgUrl={element.urlToImage?element.urlToImage:"https://static.toiimg.com/thumb/msid-97861975,width-1070,height-580,overlay-toi_sw,pt-32,y_pad-40,resizemode-75,imgsize-88902/97861975.jpg"} title={element.title?element.title:""} description={element.content?element.content:""} newsUrl={element.url}/>
                </div>
            })}
        </div>
        <div className='d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick}className="btn btn-dark">&larr; Previous</button>
            <button disabled={Math.ceil(this.state.totalResults/this.props.pageSize)<this.state.page+1}type="button" onClick={this.handleNextClick}className="btn btn-dark">Next &rarr;</button>
            </div>
      </div>
    )
  }
}

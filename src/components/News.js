import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';
import { nanoid } from 'nanoid'

export default class News extends Component {
  articles = [];
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=1&pageSize=${this.props.pageSize}`;
    this.props.setProgress(20);
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  // handlePrevClick = async () => {
  //   // console.log("Prev")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };
  // handleNextClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  fetchData =async ()=>{
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">FreqNews {this.props.category} Heading</h2>
        {/* {this.state.loading && <Loading/>} */}

        <InfiniteScroll
          dataLength={this.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.totalResults!==this.state.articles.length}
          loader={<Loading />}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (  
                <div className="col-md-4" key={nanoid()}>
                  <NewsItem
                    source={element.source.name}
                    author={element.author}
                    time={element.publishedAt}
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static.toiimg.com/thumb/msid-97861975,width-1070,height-580,overlay-toi_sw,pt-32,y_pad-40,resizemode-75,imgsize-88902/97861975.jpg"
                    }
                    title={element.title ? element.title : ""}
                    description={element.content ? element.content : ""}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) <
              this.state.page + 1
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

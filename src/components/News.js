import React, { useState,useEffect} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';
import { nanoid } from 'nanoid'

const News =(props)=> {

  const [articles,setArticles] = useState([])
  // const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
  

  const updateNews = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=1&pageSize=${props.pageSize}`;
    props.setProgress(20);
    // setLoading( true);
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      // setLoading(false)
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])
 
  // handlePrevClick = async () => {
  //   // console.log("Prev")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     props.country
  //   }&category=${
  //     props.category
  //   }&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=${
  //     this.state.page - 1
  //   }&pageSize=${props.pageSize}`;
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
  //   }&pageSize=${props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  const fetchData = async ()=>{
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=048e7be278d54807adbe8d12f6d3a43f&page=${page+1}`;
    // setLoading( true);
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    // setLoading(false)
  }
    return (
      <div className="container my-3">
        <h2 className="text-center">FreqNews {props.category} Heading</h2>
       

        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={totalResults!==articles.length}
          loader={<Loading />}
        >
          <div className="row">
            {articles.map((element) => {
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
              Math.ceil(this.state.totalResults / props.pageSize) <
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
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};


News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News
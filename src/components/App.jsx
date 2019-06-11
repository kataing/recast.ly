import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
    this.onVideoClick = this.onVideoClick.bind(this);
  }

  onVideoClick(event) {
    var newVid = this.state.videos.find((video) => {
      return video.snippet.title === event.target.textContent;
    });

    this.setState({
      currentVideo: newVid
    });
  }
 

  render() {
    return (  
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search />
          </div>
        </nav>
        <div className="row">
          <div id="videoPlayer" className="col-md-7">
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div id="videoList" className="col-md-5">
            <VideoList clickFunc={this.onVideoClick} videos={exampleVideoData} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getVideos();
  }

  getVideos() {
    var options = {
      query: '',
      max: 5,
      key: YOUTUBE_API_KEY
    };
    searchYouTube(options, () => { console.log('success'); });
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

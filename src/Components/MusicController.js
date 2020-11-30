import React, {Component} from 'react';
import '../styles/MusicController.css';
import song_file from '../Music/HOME-Resonance.mp3';


class MusicController extends Component{
    constructor(props){
        super(props);
        this.state = {
            playing: false,
            icon: 'play',
            song: "HOME-Resonance",
           
        };
        this.audio = new Audio(song_file);

        this.progressBarFull = React.createRef(); //entire gray section of progress bar
        this.progressBarCurrent = React.createRef(); //blue part, current location of progress bar

        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.setMusicState = this.setMusicState.bind(this);
        this.updateSongLocation = this.updateSongLocation.bind(this);
    }

    componentDidMount(){
       // this.progressBarCurrent.current.addEventListener('resize', handleResize);
        this.progressBarFull.current.addEventListener('click', this.updateSongLocation, false);
        this.audio.addEventListener('ended', () => this.setState({playing: false, icon: 'play'}));
    }

    componentDidUpdate(){
       
     
    }

    updateSongLocation(e){
        let rect = e.target.getBoundingClientRect();
        //x and y relative to the container
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        //Update Audio Position
        let duration = this.audio.duration;
        //divide x coord of mouse click with full width of progress bar
        let ratio = x / this.progressBarFull.current.getBoundingClientRect().width;
        //set new location clicked
        let newCurrentTime = ratio * duration;
        this.audio.currentTime = newCurrentTime;

        //update progress bar width style
        let offset = rect.left;
        let newWidth = e.clientX - rect.left;
        this.progressBarCurrent.current.style.width = `${newWidth}px`;
    }

    handleResize(){

    }

    handlePlayClick(){
        this.setState({playing: !this.state.playing}, this.setMusicState);
    }

    setMusicState(){
        //change icon
        if(this.state.playing){
            this.setState({icon: 'pause'});
            this.audio.play();
        }
        else{
            this.setState({icon: 'play'});
            this.audio.pause();
        }
    }



    render(){
        const {playing, icon, song} = this.state;
        return(
            <div className="Music-Controller">
                {/*Song Progress Bar*/}
                <div className="Progress-bar" ref={this.progressBarFull}>
                    <div className="Current-Progress-bar"
                    ref={this.progressBarCurrent}
                    ></div>
                </div>
                {/*Display Song name and album*/}
                <div className="Song-Meta">
                    <div className="song-title">Home</div>
                    <div className="song-artist">Resonance</div>
                </div>
                <div className="Controller">
                    {/*Nav buttons*/}
                    <i className="fa fa-backward"></i>
                    <i onClick={this.handlePlayClick}
                    className={`fa fa-${icon}`}></i>
                    <i className="fa fa-forward"></i>
                </div>
                <div className="Song-Selector-Tab">
                    <i className="fa fa-chevron-up"></i>
                </div>
            </div>
        );
    }
}

export default MusicController;
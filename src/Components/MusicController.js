import React, {Component} from 'react';
import '../styles/MusicController.css';
import {music} from './Music';
import MusicList from './MusicList';


class MusicController extends Component{
    constructor(props){
        super(props);
        this.state = {
            playing: false,
            icon: 'play',
            down: false, //mouse down Used for dragging the audio position
            showMusicList: false, //controls whether the pop up list shows
            currentSongInList: 0 //index into song array
        };
         //construct audio object and load first song
         this.audio = new Audio(music[this.state.currentSongInList].audio);
        
        this.progressBarFull = React.createRef(); //entire gray section of progress bar
        this.progressBarCurrent = React.createRef(); //blue part, current location of progress bar

        
        this.setMusicState = this.setMusicState.bind(this);
        this.toggleMusicList = this.toggleMusicList.bind(this);
        this.updateSongLocationOnClick = this.updateSongLocationOnClick.bind(this);
        this.updateProgressBar = this.updateProgressBar.bind(this);

        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleForwardClick = this.handleForwardClick.bind(this);
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.loadAudio = this.loadAudio.bind(this);

    }

    componentDidMount(){
        //this.progressBarCurrent.current.addEventListener('resize', handleResize);
        this.progressBarFull.current.addEventListener('mousedown', this.handleMouseDown);
        this.progressBarFull.current.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.progressBarFull.current.addEventListener('click', this.updateSongLocationOnClick, false);
        this.audio.addEventListener('timeupdate', () => this.updateProgressBar());
        this.audio.addEventListener('ended', () => this.setState({playing: false, icon: 'play'}));

        
    }

    loadAudio(audio){
        //load new audio source
        this.audio.pause();
        this.audio.src = audio;
        this.audio.play();
    }


    updateSongLocationOnClick(e){
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

    updateProgressBar(){
       let duration = this.audio.duration;
       let currentTime = this.audio.currentTime;
       let ratio =  (currentTime + .25) / duration * 100;

       let progressBar = this.progressBarCurrent.current;
       let newWidth = (ratio) - 0.115; //just some hardcoded value to stop bar from going further
       progressBar.style.width = `${newWidth}%`;
    }

    handleMouseMove(e){
        if(this.state.down) //drag position
            this.updateSongLocationOnClick(e);
    }

    handleMouseDown(e){
        this.setState({down: true});
    }

    handleMouseUp(e){
        this.setState({down: false});
    }

    handlePlayClick(){
        this.setState({playing: !this.state.playing}, this.setMusicState);
    }

    handlePrevClick(){
        if(this.state.currentSongInList > 0){ //can go to previous song
            this.setState((prevState) => {
                return {currentSongInList: prevState.currentSongInList - 1}
            }, () => {
                this.loadAudio(music[this.state.currentSongInList].audio);
            });
        }else{
            //cant go to previous so loop around
            this.setState({currentSongInList: music.length - 1},
                () => {
                    this.loadAudio(music[this.state.currentSongInList].audio);
                });
        }
    }

    handleForwardClick(){
        //ok to move to next song, haven't reached the end
        if(this.state.currentSongInList < (music.length - 1)){
            this.setState((prevState) => {
                return {currentSongInList: prevState.currentSongInList + 1}
            }, () => {
                 //load the next song
                 this.loadAudio(music[this.state.currentSongInList].audio);
            });

        }else{
             //reached end of music list, so loop back to beginning
             this.setState({currentSongInList: 0},
                () => {
                    this.loadAudio(music[this.state.currentSongInList].audio);
                });
        }
       
       
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

    toggleMusicList(){
        this.setState({showMusicList: !this.state.showMusicList})
    }

    render(){
        const {playing, icon, song, showMusicList} = this.state;
        const audio = music[this.state.currentSongInList];
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
                    <div className="song-title">{audio.title}</div>
                    <div className="song-artist">{audio.artist}</div>
                </div>
                <div className="Controller">
                    {/*Nav buttons*/}
                    <i onClick={this.handlePrevClick} 
                    className="fa fa-backward"></i>
                    <i onClick={this.handlePlayClick}
                    className={`fa fa-${icon}`}></i>
                    <i onClick={this.handleForwardClick} 
                    className="fa fa-forward"></i>
                </div>
                {/*Music List Tab*/}
                <div className={`Song-Selector-Menu ${showMusicList ? `Move-Selector-Tab List-Active` : ``}`}>
                    <div className="Toggle-Music-List">
                        <i onClick={this.toggleMusicList}
                            className="fa fa-chevron-up"></i>
                        <i onClick={this.toggleMusicList}
                          className="fa fa-chevron-down"></i>
                    </div>
                    {showMusicList && <MusicList music={music}/>}
                </div>
            </div>
        );
    }
}

export default MusicController;
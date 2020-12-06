import React, {Component} from 'react';
import '../styles/MusicController.css';
import {music} from './Music';
import MusicList from './MusicList';

//Fix javascript modulo bug
Number.prototype.mod = function(n){
    return ((this % n) + n) % n;
}


class MusicController extends Component{
    constructor(props){
        super(props);
        this.state = {
            playing: false,
            icon: 'play',
            down: false, //mouse down Used for dragging the audio position
            showMusicList: false, //controls whether the pop up list shows
            currentSongInList: 0, //index into song array
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
        this.handleSongListClick = this.handleSongListClick.bind(this);

        this.loadAudio = this.loadAudio.bind(this);

    }

    componentDidMount(){
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
        //set music playing state to true and update icon
        this.setState({playing: true});
        this.setState({icon: 'pause'});
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
        this.setState((prevState) => {
            return {currentSongInList: (prevState.currentSongInList - 1).mod(music.length)}
        }, () => {
            //load prev song
            this.loadAudio(music[this.state.currentSongInList].audio);
            this.props.handleImgChange(music[this.state.currentSongInList].img);
        });
    }

    handleForwardClick(){
        //move to next song, wrap around if at end
        this.setState((prevState) => {
            return {currentSongInList: (prevState.currentSongInList + 1) % music.length}
        }, () => {
             //load the next song
            this.loadAudio(music[this.state.currentSongInList].audio);
            this.props.handleImgChange(music[this.state.currentSongInList].img);
        });
    } 


    //takes in song item and its index that was clicked
    //to update to new song clicked
    handleSongListClick(item, idx){
        //update index var and run callback code
        this.setState({currentSongInList: idx}, () => {
            this.toggleMusicList();
            this.loadAudio(item.audio);
            this.props.handleImgChange(music[this.state.currentSongInList].img);
        });
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
        const {playing, icon, showMusicList, currentSongInList } = this.state;
        const song = music[currentSongInList];
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
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
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
                    {showMusicList && <MusicList music={music} handleSongListClick={this.handleSongListClick}/>}
                </div>
            </div>
        );
    }
}

export default MusicController;
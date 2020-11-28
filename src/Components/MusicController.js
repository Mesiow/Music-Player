import React, {Component} from 'react';
import '../styles/MusicController.css';


class MusicController extends Component{
    constructor(props){
        super(props);
        this.state = {playing: false, state: 'play'};
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.setMusicState= this.setMusicState.bind(this);
    }

    handlePlayClick(){
        this.setState({playing: !this.state.playing}, this.setMusicState);
    }

    setMusicState(){
        if(this.state.playing)
            this.setState({state: 'pause'});
        else
            this.setState({state: 'play'});    
    }

    render(){
        const {playing, state} = this.state;
        return(
            <div className="Music-Controller">
                {/*Song Progress Bar*/}
                <div className="w3-grey">
                    <div className="w3-container w3-blue"
                    style={{width:"50%", height:"8px"}}></div>
                </div>
                <div className="Controller">
                    <i className="fa fa-backward"></i>

                    <i onClick={this.handlePlayClick}
                    className={`fa fa-${state}`}></i>

                    <i className="fa fa-forward"></i>
                </div>
            </div>
        );
    }
}

export default MusicController;
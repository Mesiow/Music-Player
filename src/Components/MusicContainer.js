import React, {Component} from 'react';
import MusicController from './MusicController';
import '../styles/MusicContainer.css';
import {music} from './Music';

class MusicContainer extends Component{
    constructor(props){
        super(props);
        this.state = { //State information about a song
            img: music[0].img,
            name: "none",
        };
        this.handleImgChange = this.handleImgChange.bind(this);
    }

    handleImgChange(newImg){
        this.props.handleBackgroundImgChange(newImg); //handle background image change
        this.setState({img: newImg}); //handle controller img change
    }

    render(){
        const {img} = this.state;
        return (
            <div className="Music-Container">
                {/*Song Image*/}
                <img className="Current-Song-Img" src={img} alt="song"></img>
                {/*Music Controller*/}
                <MusicController handleImgChange={this.handleImgChange}/>
            </div>
        );
    }
}

export default MusicContainer;
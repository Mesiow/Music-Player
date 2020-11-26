import React, {Component} from 'react';
import '../styles/MusicContainer.css';
import image from '../images/egems.png';

class MusicContainer extends Component{
    constructor(){
        super();
        this.state = { //State information about a song
            img: "",
            name: "none",
            album: "none"
        };
    }
    render(){
        return (
            <div className="Music-Container">
                <img className="Current-Song-Img" src={image} alt="song"></img>
            </div>
        );
    }
}

export default MusicContainer;
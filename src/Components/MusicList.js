import React, {Component} from 'react';
import '../styles/MusicList.css';
import egems from '../images/egems.png';

const music = [
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    },
    {
        img: egems,
        title:"Home",
        artist: "Resonance"
    }
]


class MusicList extends Component{
    constructor(props){
        super(props);
        this.state = { songs: music };
    }
    render(){
        return(
            <div className="List-Container">
                {this.state.songs.map((item) => {
                return (
                 <div className="Song-Item">
                     <img className="song-img" src={item.img}/>
                     <div className="Meta">
                         <span className="song-title-item">{item.title}</span>
                         <span className="song-artist-item">{item.artist}</span>
                     </div>
                 </div>
                );
                })}
                
            </div>
        );
    }
}

export default MusicList;
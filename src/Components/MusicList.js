import React, {Component} from 'react';
import '../styles/MusicList.css';


class MusicList extends Component{
    constructor(props){
        super(props);
        this.state = { songs: this.props.music };
    }
    render(){
        const {handleSongListClick} = this.props;
        return(
            <div className="List-Container">
                {this.state.songs.map((item, idx) => {
                return (
                 <div className="Song-Item" key={idx}
                 onClick={() => handleSongListClick(item, idx)}>
                     <img className="song-img" src={item.img}/>
                     <div className="Meta">
                         <div className="song-title-item">{item.title}</div>
                         <div className="song-artist-item">{item.artist}</div>
                     </div>
                 </div>
                );
                })}
                
            </div>
        );
    }
}

export default MusicList;
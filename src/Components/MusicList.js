import React, {Component} from 'react';
import '../styles/MusicList.css';


class MusicList extends Component{
    constructor(props){
        super(props);
        this.state = { songs: [] };
    }
    render(){
        return(
            <div className="List-Container">
                
            </div>
        );
    }
}

export default MusicList;
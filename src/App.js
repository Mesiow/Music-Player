import React from 'react';
import './App.css';
import MusicContainer from './Components/MusicContainer';



function App() {
  const [backgroundImg, setBackgroundImg] = React.useState("");

  const handleBackgroundImgChange = (newImg) => {
    setBackgroundImg(newImg);
  };

  return (
    <div style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImg})`
      }}
    className="App">
  
      <MusicContainer handleBackgroundImgChange={handleBackgroundImgChange}/>
    </div>
  );
}

export default App;

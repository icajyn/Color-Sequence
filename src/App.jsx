import { useState, useEffect } from "react";
import './App.css'

const ColorPalette = ({ col }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px' }}>
    {col.map((col, index) => (
      <div key={index} style={{
        backgroundColor: col,
        width: '30px',
        height: '35px'
      }}/>
    ))}
  </div>
)

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled;
}

const ColorButtons = ({ col, onBoxClick }) => {
  const [shuffledColors, setShuffledColors] = useState([]);
  const [revealedColors, setRevealedColors] = useState(Array(col.length).fill(false))
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  useEffect(() => {
    const shuffled = shuffleArray(col);
    setShuffledColors(shuffled);
  }, [col]);

  const handleBoxClick = (index) => {
    if (shuffledColors[index] === col[currentColorIndex] && !revealedColors[index]) {
      const newRevealedColors = [...revealedColors];
      newRevealedColors[index] = true;
      setRevealedColors(newRevealedColors);

      if(currentColorIndex === col.length - 1) {
        console.log('All colors revealed!');
      } else {
        setCurrentColorIndex(currentColorIndex + 1);
      }

      onBoxClick(newRevealedColors);
    } else {
      setRevealedColors(Array(col.length).fill(false));
      setCurrentColorIndex(0);

      onBoxClick(Array(col.length).fill(false));
    }
  };

  return (
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: '10px'}}>
      {shuffledColors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: revealedColors[index] ? color: '#479991',
            width: '150px',
            height: '75px',
            cursor: 'pointer',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => handleBoxClick(index)}
        />
      ))}
    </div>
  );
};

function App() {
  const col = [ '#f331e7', '#4461dd', '#e6184b', '#f78237', '#44d2f4', '#38b74b', '#c0ef46', '#fee11c', '#921cb4'];

  const handleBoxClick = (revealedColors) => {
    console.log('Revealed Colors:', revealedColors);
  };

  return (
    <div>
      <ColorPalette col={col} />
      <ColorButtons col={col} onBoxClick={handleBoxClick} />
    </div>
  )
}

export default App;
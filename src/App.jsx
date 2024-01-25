import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

const cardImages = [
  {"src":"/img/helmet-1.png", matched:false},
  {"src":"/img/potion-1.png", matched:false},
  {"src":"/img/ring-1.png", matched:false},
  {"src":"/img/scroll-1.png", matched:false},
  {"src":"/img/shield-1.png", matched:false},
  {"src":"/img/sword-1.png", matched:false},

]



function App() {

  const [cards,setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice,setFirstChoice] = useState(null);
  const [secondChoice,setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);


  // shuffle cards

  const shuffleCards = () =>{
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card) =>({...card, id:Math.random()}));
    setCards(shuffleCards);
    setTurns(0);
  }
  
  // handle a choice

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  }

// compare 2 selected cards

useEffect(() => {
  
  if (firstChoice && secondChoice) {
    setDisabled(true);
    if (firstChoice.src === secondChoice.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === firstChoice.src) {
            return {...card, matched: true}
          } else {
            return card;
          }
        })
      })

      resetTurn()
    }
    else {
      setTimeout(() =>resetTurn(),1000);
    }
  }
},[firstChoice,secondChoice]);

// console.log(cards)

// reset choices & increase turn

const resetTurn = () => {
  setFirstChoice(null);
  setSecondChoice(null);
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false);

}

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
         <Card 
          key={card.id} 
          card={card}
           handleChoice={handleChoice}
           flipped={card === firstChoice || card === secondChoice ||card.matched}
           disabled={disabled}
           />
        ))}
      </div>
     
    </div>
  )
}

export default App

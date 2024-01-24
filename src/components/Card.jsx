import React from "react";
import "./Card.css"

const Card = ({card, handleChoice ,flipped}) => {

  const handleClick = () => {
    handleChoice(card)

  }

return (
    <div className="card" >
      <div className= {flipped ? "flipped" : ""}>
      <img className="front" src={card.src} alt="front card"/>
      <img className="back" src="/img/cover.png" onClick={handleClick} alt="card back" />
    </div>

  </div>
)}

export default Card
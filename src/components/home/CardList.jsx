// CardList.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './CardList.css';

const Card = ({ title, description }) => {

  const [hovered, setHovered] = React.useState(false);

  const cardSpring = useSpring({
    opacity: 1,
    transform: `scale(${hovered ? 1.2 : 1}) rotate(${hovered ? 5 : 0}deg)`,
    from: { opacity: 0, transform: 'scale(0.8)' },
    mass: 1,
    tension: 170,
    friction: 26,
  });

  return (
    <animated.div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...cardSpring }}
    >
      <h4>{title}</h4>
      <p>{description}</p>
    </animated.div>
  );
};

const CardList = () => {
  const cards = [
    { title: 'Enable automatic location tracking for users at new places.', description: "Seamlessly track your location in real-time as you explore new places with our automatic location tracking feature. Stay connected and enhance your safety effortlessly." },
    { title: 'Self Defence Courses', description:  "Elevate your confidence with our self-defense course on our women's safety app. Learn practical techniques for personal security and mental resilience. Empowerment begins with you." },
    { title: 'Track me', description: 'Track me feature allows you to share your location with your loved ones by updating them on when and where you are in real-time. You can also choose how long you want to be tracked by your loved ones.' },
  ];

  const containerSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    mass: 1,
    tension: 170,
    friction: 26,
  });

  return (
    <div>    
      <h2 className='features-heading text-center '>Features</h2>
    <animated.div className="card-container" style={{ ...containerSpring }}>
      {cards.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </animated.div>
    </div>
  );
};

export default CardList;

import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div  className="group border-2 border-solid border-transparent hover:border-gradient"   style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '200px' }}>
      <h3>{title}</h3>
      <p   >{content}</p>
    </div>
  );
}

export default Card;

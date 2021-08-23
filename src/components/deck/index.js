/* eslint-disable no-unused-vars */
import React from 'react';
import { useDrop } from 'react-dnd';
import './style.css';

export const Deck = ({ deck, children, onDropped, completed }) => {
  const [_, drop] = useDrop(
    () => ({
      accept: 'card',
      drop: (item) => {
        onDropped(item, deck.cards[deck.cards.length - 1], deck);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [deck]
  );

  return (
    <div className={completed ? 'deck-completed' : 'deck-not-completed'} ref={drop}>
      {children.map((c, index) => (
        <div
          className="child-deck"
          key={index}
          style={{
            position: 'relative',
            top: -index * 235,
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default Deck;

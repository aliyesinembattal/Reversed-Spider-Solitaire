import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Ranks from './ranks';
import './style.css';

const scale = 'scale(0.7, 0.7)';

const defaultHighlight = { boxShadow: 'rgb(152, 217, 237) 0px 0px 7px 9px' };

const ranks = { 11: 'J', 12: 'Q', 13: 'K', 1: 'A' };

export const Card = ({ id, suit, rank, visible, completed, disabled, highlighted, onClick, onDropped }) => {
  const spades = {
    symbol: '\u2660',
    name: 'pique',
    color: 'black',
  };
  const highlight = highlighted ? defaultHighlight : {};
  const rankLabel = ranks[rank] || rank;
  const card = { id, suit, rank, visible, disabled, highlighted, onClick };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: card,
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'card',
      drop: (item) => {
        onDropped(item, card);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [card]
  );

  const handleClick = () => {
    onClick({ id, suit, rank, visible });
  };

  if (disabled) {
    return (
      <div
        ref={drop}
        className="card disabled"
        style={{
          transform: scale,
          border: '2px dashed',
        }}
      >
        <div className="eren">
          <img style={{ width: '165px', height: '260px', borderRadius: '10px' }} src="Eren.jpg" alt="Eren.jpg" />
        </div>
      </div>
    );
  }

  if (!visible) {
    return (
      <div
        className="card not-visible"
        onClick={handleClick}
        style={{
          background: 'linear-gradient(135deg, #0B486B 0%,#F56217 100%)',
          transform: scale,
        }}
      ></div>
    );
  }

  return (
    <div ref={drop}>
      <div
        onClick={handleClick}
        ref={drag}
        style={{
          cursor: 'move',
        }}
      >
        <div className="card" style={{ transform: !completed ? scale : 'none', ...highlight, color: isOver ? 'mauve' : isDragging ? 'purple' : spades.color }}>
          <Ranks rank={rank} spades={spades} rankLabel={rankLabel} />
        </div>
      </div>
    </div>
  );
};

export default Card;

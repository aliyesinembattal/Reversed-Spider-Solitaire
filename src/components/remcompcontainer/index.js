/* eslint-disable array-callback-return */
import React from 'react';
import { Card, Deck } from '../index';
import './style.css';

export const RemainingCompletedContainer = ({ remainingCards, completedDecks, handleDistributeRemainingCards, onDropped }) => {
  return (
    <>
      <div className="completed-cards">
        <span style={{ display: 'block' }}>{remainingCards.length > 0 ? <Card visible={false} onClick={handleDistributeRemainingCards} /> : <Card disabled={true}></Card>}</span>
        <div style={{ pointerEvents: 'none' }}>
          {completedDecks.map((deck, index) => {
            return (
              <Deck key={deck.id} style={{ transform: 'none' }} deck={deck} completed={true} onDropped={onDropped}>
                {deck.cards.map((card) => {
                  return <Card {...card} completed={true} />;
                })}
              </Deck>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RemainingCompletedContainer;

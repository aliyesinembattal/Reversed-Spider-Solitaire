/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { completedDecks } from '../../constants/completedDecks';
import { allPossibleMoves, checkSuiteCombined, checkWon, dealRemainingCards, findBestMove, moveCard, possibleMoves, setInitialGame } from '../../lib/game';
import { Card, Deck, RemainingCompletedContainer } from '../index';
import './style.css';

export const GameBoard = () => {
  const [game, setRawGame] = useState(setInitialGame());
  const [completed, setCompleted] = useState({ decks: completedDecks, counter: 0 });
  const [gameHistory, setGameHistory] = useState([]);
  const [highlightedCards, setHightlightedCards] = useState(new Set());

  const setGame = (newgame) => {
    gameHistory.push(game);
    setGameHistory(gameHistory);
    let checkCombined = checkSuiteCombined(newgame);
    if (checkCombined.consecutive)
      setCompleted({
        decks: completed.decks.map((deck, index) => {
          if (index === completed.counter)
            return {
              cards: [
                {
                  id: '135a8b8e-ad65-4089-9d4c-8ebb260ff076',
                  rank: 1,
                  suit: 'spades',
                  visible: true,
                },
              ],
              id: deck.id,
            };
          else return deck;
        }),
        counter: completed.counter + 1,
      });

    setRawGame(checkWon(checkCombined.game));
  };

  const handleDealRemainingCards = () => {
    setGame(dealRemainingCards(game));
  };

  const onDropped = (droppedCard, targetCard, deck) => {
    let moves = allPossibleMoves(game);
    const selectedMove = moves.find((move) => {
      const sameMovedCard = move.card.id === droppedCard.id;
      const lastCardDeck = move.targetDeck.cards[move.targetDeck.cards.length - 1];
      if (targetCard) {
        return sameMovedCard && lastCardDeck && lastCardDeck.id === targetCard.id;
      } else if (deck) {
        return sameMovedCard && move.targetDeck.id === deck.id;
      }
    });
    const newGame = moveCard(game, selectedMove);
    setGame(newGame);
  };

  const onClickCard = (card) => {
    const moves = possibleMoves(card, game);
    if (moves.length > 0) {
      const newGame = moveCard(game, findBestMove(moves, game));
      setGame(newGame);
    }
  };
  const handleUndo = () => {
    const previousGame = gameHistory[gameHistory.length - 1];
    setGameHistory(gameHistory.slice(0, gameHistory.length - 1));
    setRawGame(previousGame);
  };

  const showHint = () => {
    const moves = allPossibleMoves(game);
    setHightlightedCards(new Set(moves.map((m) => m.card.id)));
  };
  const resetHighlighted = () => setHightlightedCards(new Set());
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="spider.ico" alt="spider.ico" />
        <div style={{ display: 'flex', height: '50px', alignItems: 'center' }}>
          <a href="/one-suite-reversed-spider-solitaire" style={{ marginLeft: 'auto' }}>
            <button className="new-btn">New</button>
          </a>
        </div>
        <button className="undo-btn" onClick={handleUndo} disabled={gameHistory.length === 0}>
          Undo
        </button>
        <button className="hint-btn" onMouseDown={showHint} onMouseUp={resetHighlighted}>
          Hint ?
        </button>
      </div>
      <div className="remaining-completed-cards">
        <RemainingCompletedContainer remainingCards={game.remainingCards} completedDecks={completed.decks} handleDealRemainingCards={handleDealRemainingCards} onDropped={onDropped} />

        <div id="cards" className="cards">
          {game.decks.map((deck) => {
            return (
              <Deck key={deck.id} deck={deck} onDropped={onDropped}>
                {deck.cards
                  .map((card) => {
                    return <Card key={card.id} {...card} onClick={onClickCard} onDropped={onDropped} highlighted={highlightedCards.has(card.id)} />;
                  })
                  .concat(deck.cards.length === 0 ? [<Card disabled={true} onDropped={(dropped) => onDropped(dropped, undefined, deck)} />] : [])}
              </Deck>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GameBoard;

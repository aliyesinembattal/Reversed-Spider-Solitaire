/* eslint-disable array-callback-return */
import { uuid } from 'uuidv4';

export const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
export const setInitialGame = () => createGame(shuffle(generateCardsForSpade()));
export const lastCard = (deck) => deck.cards[deck.cards.length - 1];
// suffle cards
export const shuffle = (cards) => {
  for (let step = 0; step < 1; step++) {
    cards.sort((a, b) => 0.2 - Math.random());
  }
  return cards;
};
//create game object of Trendyol Case
export const createGame = (cards) => {
  const decks = [];
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    for (let tourIndex = 0; tourIndex < 4; tourIndex++) {
      const card = cards.shift();
      if (decks[deckIndex] === undefined) {
        decks[deckIndex] = { id: deckIndex, cards: [] };
      }
      if (card) {
        decks[deckIndex].cards.push({ ...card, visible: false });
      }
    }
  }
  for (let deckIndex = 0; deckIndex < 4; deckIndex++) {
    const card = cards.shift();
    if (card) {
      decks[deckIndex].cards.push({ ...card, visible: false });
    }
  }
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    const card = cards.shift();
    if (card) {
      decks[deckIndex].cards.push({ ...card, visible: true });
    }
  }

  return {
    decks,
    remainingCards: cards,
  };
};

// generate one suite of spade cards with ranks and id
export const generateCardsForSpade = () => {
  let spadeCards = [];
  for (let index = 0; index < 8; index++) {
    const spadeRanks = ranks.map((rank) => ({
      id: uuid(),
      rank: rank,
      suit: 'spades',
    }));
    spadeCards = [...spadeCards, ...spadeRanks];
  }
  return spadeCards;
};

// hard copy game object (clone game)
export const cloneGame = (game) => JSON.parse(JSON.stringify(game));

// deal the remaining cards
export const dealRemainingCards = (game) => {
  const newGame = cloneGame(game);

  if (game.decks.some((deck) => deck.cards.length === 0)) {
    alert('All decks should have at least one card to deal remaining cards');
    return newGame;
  }

  const cards = newGame.remainingCards;
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    const card = cards.shift();
    if (card) {
      newGame.decks[deckIndex].cards.push({ ...card, visible: true });
    }
  }

  return newGame;
};

// check spade cards and create new game object
// spade cards must be suite of sorting asc 1,2,3,4...,13
export const checkSuiteCombined = (game) => {
  for (let deck of game.decks) {
    const last = lastCard(deck);
    if (last && last.rank === 13) {
      const candidateSuite = deck.cards.slice(deck.cards.length - 13, deck.cards.length);
      const allSameSuiteAndVisible = candidateSuite.every((c) => c.suit === last.suit && c.visible);
      const candidateRanks = candidateSuite.map((c) => c.rank);
      const consecutive = JSON.stringify(candidateRanks) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
      if (allSameSuiteAndVisible && consecutive) {
        const newgame = cloneGame(game);
        newgame.decks[deck.id].cards = newgame.decks[deck.id].cards.filter((c, index) => index < deck.cards.length - 13);
        const last = lastCard(newgame.decks[deck.id]);
        if (last) {
          last.visible = true;
        }
        return { game: newgame, consecutive: true };
      }
    }
  }
  return { game, consecutive: false };
};
// Are remaining cards and cards of decks empty ?
export const checkWon = (game) => {
  const allDeckEmpty = game.decks.every((deck) => deck.cards.length === 0);
  const noRemainingCards = game.remainingCards.length === 0;
  if (allDeckEmpty && noRemainingCards) {
    alert('You Win!');
  }
  return game;
};

// move card target deck from source deck logic
export const moveCard = (game, move) => {
  if (move === undefined) {
    return game;
  }
  const newgame = cloneGame(game);
  const sourceDeck = newgame.decks[move.sourceDeck.id];
  const movedCards = sourceDeck.cards.slice(move.sourceCardIndex);
  sourceDeck.cards = sourceDeck.cards.slice(0, move.sourceCardIndex);
  const last = lastCard(sourceDeck);
  if (last) {
    last.visible = true;
  }
  movedCards.forEach((c) => newgame.decks[move.targetDeck.id].cards.push(c));
  return newgame;
};

// if previous card and current card ranks +1 are equal, this funtion should return false
export const isASuite = (cards) => {
  if (cards.length === 1) {
    return true;
  }
  let previous = cards[0];
  for (let card of cards.slice(1)) {
    if (card.rank !== previous.rank + 1) {
      return false;
    }
    previous = card;
  }
  return true;
};

// generated possible moves
export const possibleMoves = (card, game) => {
  const moves = [];
  if (card.visible) {
    for (let deck of game.decks) {
      const cardIndex = deck.cards.findIndex((c) => c.id === card.id);

      if (cardIndex >= 0) {
        const selectedCards = deck.cards.slice(cardIndex, deck.cards.length);
        const asuite = isASuite(selectedCards);
        if (asuite) {
          const playableDecks = game.decks.filter((deck) => {
            const candidateCard = lastCard(deck);
            if (candidateCard === undefined) {
              return true;
            }
            if (candidateCard.rank + 1 === card.rank) {
              return true;
            }
          });

          playableDecks.forEach((targetDeck) =>
            moves.push({
              card: card,
              sourceDeck: deck,
              sourceCardIndex: cardIndex,
              targetDeck: targetDeck,
            })
          );
        }
      }
    }
  }
  return moves;
};
// return all possible move
export const allPossibleMoves = (game) => {
  let results = [];
  for (let deck of game.decks) {
    for (let card of deck.cards.filter((c) => c.visible)) {
      const moves = possibleMoves(card, game);
      results = results.concat(moves);
    }
  }
  return results;
};

export const findBiggestDeck = (game) => Math.max(...game.decks.map((deck) => deck.cards.filter((c) => c.visible).length));

export const randomItem = (items) => shuffle(items)[Math.floor(Math.random() * items.length)];

export const calculateNumberOfHiddenCards = (game) => game.decks.map((deck) => deck.cards.filter((c) => c.visible === false).length).reduce((a, b) => a + b, 0);

export const numberOfCards = (game) => game.decks.map((deck) => deck.cards.length).reduce((a, b) => a + b, 0);

// called by card click card action
// searching and find best move target deck from source deck
export const findBestMove = (moves, game) => {
  if (moves.length === 0) {
    return;
  }
  for (let move of moves) {
    const checkCombined = checkSuiteCombined(moveCard(game, move));
    move.numberOfHidenCards = findBiggestDeck(checkCombined.game) + (104 - calculateNumberOfHiddenCards(checkCombined.game)) + (104 - numberOfCards(checkCombined.game));
  }
  moves = moves.sort((a, b) => (a.numberOfHidenCards < b.numberOfHidenCards ? -1 : 1));

  let move;
  if (Math.random() > 0.1) {
    move = randomItem(moves);
  } else {
    move = moves[moves.length - 1];
  }

  return move;
};

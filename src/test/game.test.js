import { cloneGame, isASuite, possibleMoves, setInitialGame } from '../lib/game';
import SpadesCardsOfDecks from '../mock/spadesCardsofDecks.json';

test('cards must be a suite', () => {
  const asuite = isASuite([
    { rank: 5, suit: 'spades', visible: true },
    { rank: 6, suit: 'spades', visible: true },
    { rank: 7, suit: 'spades', visible: true },
  ]);
  expect(asuite).toBe(true);
});
test('decks length must be 10.', () => {
  const defaultGame = setInitialGame(1);
  expect(defaultGame.decks.length).toBe(10);
});

test('cards of decks count array must be [6, 6, 6, 6, 5, 5, 5, 5, 5, 5]', () => {
  const defaultGame = setInitialGame(1);
  // cards of decks count array must be [6, 6, 6, 6, 5, 5, 5, 5, 5, 5]
  expect(defaultGame.decks.map((d) => d.cards.length)).toStrictEqual([6, 6, 6, 6, 5, 5, 5, 5, 5, 5]);
});

test('remaining cards count must be 50', () => {
  const defaultGame = setInitialGame(1);
  expect(defaultGame.remainingCards.length).toBe(50);
});
test('check clone game function', () => {
  const defaultGame = setInitialGame(1);
  const clonedGame = cloneGame(defaultGame);
  expect(clonedGame).toEqual(defaultGame);
});
test('possible moves', () => {
  const game = JSON.parse(JSON.stringify(SpadesCardsOfDecks));
  const card = game.decks[4].cards[game.decks[4].cards.length - 1];
  const moves = possibleMoves(card, game);
  const move = moves[0];
  expect(move.sourceDeck.id).toEqual(4);
  expect(move.targetDeck.id).toEqual(1);
});

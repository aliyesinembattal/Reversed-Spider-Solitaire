import React from 'react';

const Ranks = ({ rank, spades, rankLabel }) => {
  return (
    <>
      <div className="front">
        <div className="corner top">
          <span className="number">{rankLabel}</span>
          <span className="spades">{spades.symbol}</span>
        </div>

        {rank === 2 && (
          <>
            <span className="suit top_center">{spades.symbol}</span>
            <span className="suit bottom_center">{spades.symbol}</span>
          </>
        )}

        {rank === 3 && (
          <>
            <span className="suit top_center">{spades.symbol}</span>
            <span className="suit middle_center">{spades.symbol}</span>
            <span className="suit bottom_center">{spades.symbol}</span>
          </>
        )}
        {rank === 4 && (
          <>
            <span className="suit top_left">{spades.symbol}</span>
            <span className="suit top_right">{spades.symbol}</span>
            <span className="suit bottom_left">{spades.symbol}</span>
            <span className="suit bottom_right">{spades.symbol}</span>
          </>
        )}
        {rank === 5 && (
          <>
            <span className="suit top_left">{spades.symbol}</span>
            <span className="suit top_right">{spades.symbol}</span>
            <span className="suit middle_center">{spades.symbol}</span>
            <span className="suit bottom_left">{spades.symbol}</span>
            <span className="suit bottom_right">{spades.symbol}</span>
          </>
        )}

        {rank === 6 && (
          <>
            <span className="suit top_left">{spades.symbol}</span>
            <span className="suit top_right">{spades.symbol}</span>
            <span className="suit middle_left">{spades.symbol}</span>
            <span className="suit middle_right">{spades.symbol}</span>
            <span className="suit bottom_left">{spades.symbol}</span>
            <span className="suit bottom_right">{spades.symbol}</span>
          </>
        )}

        {rank === 7 && (
          <>
            <span className="suit top_left">{spades.symbol}</span>
            <span className="suit top_right">{spades.symbol}</span>
            <span className="suit middle_left">{spades.symbol}</span>
            <span className="suit middle_top">{spades.symbol}</span>
            <span className="suit middle_right">{spades.symbol}</span>
            <span className="suit bottom_left">{spades.symbol}</span>
            <span className="suit bottom_right">{spades.symbol}</span>
          </>
        )}
        {rank === 8 && (
          <>
            <span className="suit top_left">{spades.symbol}</span>
            <span className="suit top_right">{spades.symbol}</span>
            <span className="suit middle_left">{spades.symbol}</span>
            <span className="suit middle_top">{spades.symbol}</span>
            <span className="suit middle_right">{spades.symbol}</span>
            <span className="suit middle_bottom">{spades.symbol}</span>
            <span className="suit bottom_left">{spades.symbol}</span>
            <span className="suit bottom_right">{spades.symbol}</span>
          </>
        )}

        {rank === 9 && (
          <>
            <span className="suit top_left">{spades.symbol}</span>
            <span className="suit top_right">{spades.symbol}</span>

            <span className="suit middle_top_left">{spades.symbol}</span>
            <span className="suit middle_center">{spades.symbol}</span>
            <span className="suit middle_top_right">{spades.symbol}</span>
            <span className="suit bottom_left">{spades.symbol}</span>
            <span className="suit bottom_right">{spades.symbol}</span>
            <span className="suit middle_bottom_left">{spades.symbol}</span>
            <span className="suit middle_bottom_right">{spades.symbol}</span>
          </>
        )}
        {rank === 10 && (
          <>
            <span className="suit top_left">{spades.symbol}</span>
            <span className="suit top_right">{spades.symbol}</span>

            <span className="suit middle_top_left">{spades.symbol}</span>
            <span className="suit middle_top_center">{spades.symbol}</span>
            <span className="suit middle_top_right">{spades.symbol}</span>
            <span className="suit bottom_left">{spades.symbol}</span>
            <span className="suit bottom_right">{spades.symbol}</span>
            <span className="suit middle_bottom_center">{spades.symbol}</span>
            <span className="suit middle_bottom_left">{spades.symbol}</span>
            <span className="suit middle_bottom_right">{spades.symbol}</span>
          </>
        )}
        {rank > 10 && <span className="suit middle_center">{spades.symbol}</span>}
        <div className="corner bottom">
          <span className="number">{rankLabel}</span>
          <span>{spades.symbol}</span>
        </div>
      </div>

      <div className="back"></div>
    </>
  );
};

export default Ranks;

import React, { PropTypes } from 'react';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  score: PropTypes.number.isRequired,
};

export const Score = props => {
  const score = props.score;
  return (
    <div className="score">
      { score }
    </div>
  );
};

Score.propTypes = propTypes;

export default Score;

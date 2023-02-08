import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ index, recipe }) {
  const [message, setMessage] = useState(false);
  const msgCopied = 'Link copied!';

  const handleClick = (recipeProps) => {
    if (recipeProps.type === 'meal') {
      clipboardCopy(`http://localhost:3000/meals/${recipeProps.id}`);
      setMessage(!message);
      return;
    }
    if (recipeProps.type === 'drink') {
      clipboardCopy(`http://localhost:3000/drinks/${recipeProps.id}`);
      setMessage(!message);
    }
  };

  return (
    <div>
      <div key={ index }>
        <button
          type="button"
          onClick={ () => handleClick(recipe) }
          data-testid="button-share"
        >
          <img
            src={ shareIcon }
            alt="Share Img"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <span>{message && <span>{msgCopied}</span>}</span>
      </div>
    </div>
  );
}
ShareButton.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,
};

export default ShareButton;

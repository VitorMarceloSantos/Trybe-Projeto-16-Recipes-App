import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

function ShareProduct({ index, recipe }) {
  const { location: { pathname } } = useHistory();
  const [message, setMessage] = useState(false);
  // const msgCopied = 'Link copied!';

  const handleClick = (recipeProps) => {
    setMessage(!message);
    if (recipeProps.length !== 0 && recipeProps.type === 'meal') {
      clipboardCopy(`http://localhost:3000/meals/${recipeProps.id}`);
      return;
    }
    if (recipeProps.length !== 0 && recipe.type === 'drink') {
      clipboardCopy(`http://localhost:3000/drinks/${recipeProps.id}`);
      return;
    }
    const clipBoard = pathname.split('/in-progress');
    clipboardCopy(`http://localhost:3000${clipBoard[0]}`);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={ () => handleClick(recipe) }
        >
          <img
            data-testid={ pathname === '/done-recipes'
              ? `${index}-horizontal-share-btn` : 'share-btn' }
            src={ shareIcon }
            alt=""
          />
        </button>
        {message && <p>Link copied!</p>}
      </div>
    </div>
  );
}

ShareProduct.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape(),
};

ShareProduct.defaultProps = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,
};

export default ShareProduct;

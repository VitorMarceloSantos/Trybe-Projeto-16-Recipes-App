import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Recipes({ imageSrc, index, name, id }) {
  const history = useHistory();
  const handleClick = () => {
    const path = history.location.pathname;
    if (path === '/meals') {
      history.push(`/meals/${id}`);
    }
    if (path === '/drinks') {
      history.push(`/drinks/${id}`);
    }
  };
  return (

    <li data-testid={ `${index}-recipe-card` }>
      <button type="button" name={ name } onClick={ handleClick }>
        <img
          src={ imageSrc }
          data-testid={ `${index}-card-img` }
          alt={ `${index}-${name}-alt` }
        />
        <p data-testid={ `${index}-card-name` }>{ name }</p>
      </button>

    </li>

  );
}

Recipes.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default Recipes;

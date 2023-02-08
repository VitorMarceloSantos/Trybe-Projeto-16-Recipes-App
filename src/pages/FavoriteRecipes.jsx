import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';

function FavoriteRecipes() {
  const [productLocalStorage, setProductLocalStorage] = useState([]);
  const [filterSelection, setFilterSelection] = useState([]);
  const [useUpdate, setUseUpdate] = useState(false);

  const verifyLocalStorage = () => {
    const getLocalStorage = localStorage.getItem('favoriteRecipes');
    const product = JSON.parse(getLocalStorage);
    if (product !== null) {
      setProductLocalStorage(product);
      setFilterSelection(product);
      return true;
    }
  };

  const removeFavorite = (id) => {
    const arrayFilter = productLocalStorage
      .filter((product) => product.id !== id);
    setUseUpdate(!useUpdate);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...arrayFilter],
    ));
  };

  useEffect(() => {
    verifyLocalStorage();
  }, [useUpdate]);

  const verifyButtons = (name) => {
    switch (name) {
    // case 'All':
    //   setFilterSelection(productLocalStorage);
    //   break;
    case 'Meals':
      setFilterSelection(productLocalStorage
        .filter((product) => product.type === 'meal'));
      break;
    case 'Drinks':
      setFilterSelection(productLocalStorage
        .filter((product) => product.type === 'drink'));
      break;
    default:
      setFilterSelection(productLocalStorage);
    }
  };
  // console.log(filterSelection)
  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="All"
        onClick={ (e) => verifyButtons(e.target.name) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="Meals"
        onClick={ (e) => verifyButtons(e.target.name) }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="Drinks"
        onClick={ (e) => verifyButtons(e.target.name) }
      >
        Drinks
      </button>
      {filterSelection !== null && (filterSelection.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ recipe.type === 'meal' ? (`/meals/${recipe.id}`)
              : (`/drinks/${recipe.id}`) }
          >
            <img
              src={ recipe.image }
              alt={ `Img-${index}` }
              role="presentation"
              data-testid={ `${index}-horizontal-image` }
              width="300"
              height="300"
            />
          </Link>
          {recipe.alcoholicOrNot && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.alcoholicOrNot} - ${recipe.category}`}
            </p>
          )}
          {/* {recipe.area && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.area} - ${recipe.category}`}
            </p>
          )} */}
          {recipe.nationality && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          )}
          <Link to={ (`/drinks/${recipe.id}`) }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>

          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            name={ recipe.id }
            // alt={ `${index}-Icone-Favorito` }
            onClick={ (e) => removeFavorite(e.target.name) }
          >
            <img
              src={ blackHeartIcon }
              alt={ `${index}-Icone-Favorito` }
              name={ recipe.id }
            />
          </button>
          {/* <HeartButton /> */}
          <ShareButton index={ index } recipe={ recipe } />
        </div>
      )))}
    </div>
  );
}

export default FavoriteRecipes;

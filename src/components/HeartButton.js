import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function HeartButton({ recipeDetails, mealDetails, drinkDetails }) {
  let arrayParametro = {};
  if (Object.keys(recipeDetails).length !== 0) {
    arrayParametro = recipeDetails;
  }
  if (Object.keys(mealDetails).length !== 0) {
    const { meals: temp } = mealDetails;
    arrayParametro = { ...temp[0] };
  }
  if (Object.keys(drinkDetails).length !== 0) {
    const { drinks: temp } = drinkDetails;
    arrayParametro = { ...temp[0] };
  }

  const [heartIcon, setHeartIcon] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  const addToLocalStorage = () => {
    const getLocalStorage = localStorage.getItem('favoriteRecipes');
    const item = JSON.parse(getLocalStorage);
    const arrayLocalStorage = item !== null ? item : [];
    setHeartIcon(!heartIcon);
    const idNumber = pathname.split('/')[2];
    if (item !== null && arrayLocalStorage.some((product) => product.id === idNumber)) {
      // console.log('Item', item);
      // console.log('idNumber', idNumber);
      const arrayFilter = arrayLocalStorage
        .filter((product) => product.id !== idNumber);
      // console.log('Filter', arrayFilter);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...arrayFilter],
      ));
    }
    const pathName = pathname.split('/')[1];
    if (pathName === 'meals') {
      const savedItem = {
        id: arrayParametro.idMeal,
        type: 'meal',
        nationality: arrayParametro.strArea,
        category: arrayParametro.strCategory,
        alcoholicOrNot: '',
        name: arrayParametro.strMeal,
        image: arrayParametro.strMealThumb,
      };
      // console.log('ArrayLocalStorage', arrayLocalStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...arrayLocalStorage, savedItem],
      ));
    } else if (pathName === 'drinks') {
      const savedItem = {
        id: arrayParametro.idDrink,
        type: 'drink',
        nationality: '',
        category: arrayParametro.strCategory,
        alcoholicOrNot: arrayParametro.strAlcoholic,
        name: arrayParametro.strDrink,
        image: arrayParametro.strDrinkThumb,
      };
      // console.log('ArrayLocalStorage', arrayLocalStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...arrayLocalStorage, savedItem],
      ));
    }
  };

  // Verificando os elementos salvos no localStorage, para preencher o heart
  const blackOrWhite = () => {
    const getLocalStorage = localStorage.getItem('favoriteRecipes');
    const savedItem = JSON.parse(getLocalStorage) !== null
      ? JSON.parse(getLocalStorage) : [];
    const idNumber = pathname.split('/')[2];
    if (savedItem.length !== 0) {
      const idFromLocalStorage = savedItem[0].id;
      if (idFromLocalStorage === idNumber) {
        setHeartIcon(true);
      }
    }
  };

  useEffect(() => {
    blackOrWhite();
  });

  return (
    <button type="button" onClick={ addToLocalStorage }>
      <img
        data-testid="favorite-btn"
        src={ heartIcon ? blackHeartIcon : whiteHeartIcon }
        alt=""
      />
    </button>
  );
}

HeartButton.propTypes = {
  recipeDetails: PropTypes.node,
  mealDetails: PropTypes.node,
  drinkDetails: PropTypes.node,
};

HeartButton.defaultProps = {
  recipeDetails: PropTypes.node.isRequired,
  mealDetails: PropTypes.node.isRequired,
  drinkDetails: PropTypes.node.isRequired,
};

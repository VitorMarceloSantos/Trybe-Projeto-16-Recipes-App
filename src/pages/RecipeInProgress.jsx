import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
// import MyContext from '../context/Context';
import ShareProduct from '../components/ShareProduct';
import HeartButton from '../components/HeartButton';

function RecipeInProgress({ match: { params: { id } } }) {
  // const { idDetails } = useContext(MyContext);
  const [mealsRoute, setMealsRoute] = useState(false);
  const [drinksRoute, setDrinksRoute] = useState(false);
  const [mealDetails, setMealDetails] = useState({});
  const [drinkDetails, setDrinkDetails] = useState({});
  const history = useHistory();
  const [itensSelected, setItensSelected] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  let local = [];

  if (localStorage.getItem(`favoriteRecipes${id}`)
  && (JSON.parse(localStorage.getItem(`favoriteRecipes${id}`)).length !== 0)) {
    local = JSON.parse(localStorage.getItem(`favoriteRecipes${id}`));
  }

  useEffect(() => {
    setItensSelected(local);
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const results = await response.json();
      setMealDetails(results);
      setMealsRoute(true);
    };
    const fetchBebidas = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const results = await response.json();
      setDrinkDetails(results);
      setDrinksRoute(true);
    };
    if (history.location.pathname.includes('/meals')) {
      fetchMenus();
    }
    if (history.location.pathname.includes('/drinks')) {
      fetchBebidas();
    }
    // eslint-disable-next-line
  }, [id]);

  const itemSelected = ({ target }) => {
    let arrayTemp = [];
    if (localStorage.getItem(`favoriteRecipes${id}`)) {
      localStorage.removeItem(`favoriteRecipes${id}`);
    }
    if ((itensSelected.every((product) => product !== target.id))
    || itensSelected.length === 0) {
      arrayTemp = [...itensSelected, target.id];
      setItensSelected(arrayTemp);
      localStorage.setItem(`favoriteRecipes${id}`, JSON.stringify(arrayTemp));
    } else {
      arrayTemp = [...itensSelected.filter((product) => product !== target.id)];
      setItensSelected(arrayTemp);
      localStorage.setItem(`favoriteRecipes${id}`, JSON.stringify(arrayTemp));
    }
    const quantidade = document.querySelectorAll('.checkbox-selected');
    if (arrayTemp.length === quantidade.length) {
      setDisableButton(false);
    } else setDisableButton(true);
  };

  return (
    <div>
      <h2>Recipe in Progress</h2>
      {mealsRoute
      && mealDetails.meals.map((elem, index) => (
        <div key={ index }>
          <img
            alt="meal-thumbnail"
            src={ elem.strMealThumb }
            width="330"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ elem.strMeal }</p>
          <ShareProduct />
          {/* <button data-testid="share-btn" type="button">Share</button> */}
          {/* <button data-testid="favorite-btn" type="button">Favorite</button> */}
          <HeartButton
            mealDetails={ mealDetails }
          />
          <p data-testid="recipe-category">{ elem.strCategory }</p>
          <p data-testid="instructions">{ elem.strInstructions }</p>
          {Object.keys(mealDetails.meals[0])
            .filter((e) => e.includes('strIngredient'))
            .map((e2, i) => mealDetails.meals[0][e2]
          && (
            <div key={ i }>
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ mealDetails.meals[0][e2] }
              >
                <input
                  className="checkbox-selected"
                  type="checkbox"
                  id={ mealDetails.meals[0][e2] }
                  name="selected-ingredient"
                  onChange={ (e) => itemSelected(e) }
                  checked={ local.length !== 0
                    ? (local.some((product) => product === mealDetails
                      .meals[0][e2])) : false }
                />
                {mealDetails.meals[0][e2]}
              </label>
            </div>
          ))}
        </div>
      ))}
      {drinksRoute
      && drinkDetails.drinks.map((elem, index) => (
        <div key={ index }>
          <img
            alt="meal-thumbnail"
            src={ elem.strDrinkThumb }
            width="330"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ elem.strDrink }</p>
          <ShareProduct />
          <HeartButton
            drinkDetails={ drinkDetails }
          />
          {/* <button data-testid="favorite-btn" type="button">Favorite</button> */}
          <p data-testid="recipe-category">{ elem.strCategory }</p>
          <p data-testid="instructions">{ elem.strInstructions }</p>
          {Object.keys(drinkDetails.drinks[0])
            .filter((e) => e.includes('strIngredient'))
            .map((e2, i) => drinkDetails.drinks[0][e2]
          && (
            <div key={ i }>
              <label
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ drinkDetails.drinks[0][e2] }
              >
                <input
                  className="checkbox-selected"
                  type="checkbox"
                  id={ drinkDetails.drinks[0][e2] }
                  name="selected-ingredient"
                  onChange={ (e) => itemSelected(e) }
                  checked={ local.length !== 0
                    ? (local.some((product) => product === drinkDetails
                      .drinks[0][e2])) : false }
                />
              </label>
              {drinkDetails.drinks[0][e2]}
            </div>
          ))}
        </div>
      ))}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ disableButton }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe

      </button>
    </div>
  );
}
RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeInProgress;

import React, { useEffect, useState } from 'react';
/* import { useLocation, useRouteMatch } from 'react-router-dom'; */
import { useHistory } from 'react-router-dom';
import fetchIdRecipes from '../services/fetchDetails25';
import DetailsDrinks from '../components/DetailsDrink';
import DetailsMeals from '../components/DetailsMeals';
// import shareIcon from '../images/shareIcon.svg';
import '../styles/Details.css';
import HeartButton from '../components/HeartButton';
import ShareProduct from '../components/ShareProduct';

function RecipeDetails() {
  const [recipeDetails,
    setRecipeDetails] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(
    () => fetchIdRecipes(history, setRecipeDetails),
    [history],
  );
  /*   const addToLocalStorage = () => {
    const pathName = pathname.split('/')[1];

    if (pathName === 'meals') {
      const savedItem = {
        id: recipeDetails.idMeal,
        type: 'meal',
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,

      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([savedItem]));
    } else if (pathName === 'drinks') {
      const savedItem = {
        id: recipeDetails.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDetails.strCategory,
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails.strDrink,
        image: recipeDetails.strDrinkThumb,

      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([savedItem]));
    }

    console.log(recipeDetails);
  }; */
  return (
    <body>
      {pathname.split('/')[1] === 'meals'
        ? DetailsMeals(recipeDetails)
        : DetailsDrinks(recipeDetails) }

      <div>
        <HeartButton recipeDetails={ recipeDetails } />
        {/*         <button type="button" onClick={ addToLocalStorage }>
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt=""

          />
        </button> */}

        <ShareProduct />

      </div>

    </body>
  );
}

export default RecipeDetails;

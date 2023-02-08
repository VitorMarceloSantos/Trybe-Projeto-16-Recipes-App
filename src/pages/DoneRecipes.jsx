import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import ShareButton from '../components/ShareButton';
import ShareProduct from '../components/ShareProduct';
import './DoneRecipes.css';

function DoneRecipes() {
  const [searchMeals, setSearchMeals] = useState(false);
  const [searchDrinks, setSearchDrinks] = useState(false);
  const [searchAll, setSearchAll] = useState(true);
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: ['Limon'],
    },
  ];

  const handleClickAll = () => {
    setSearchMeals(false);
    setSearchAll(true);
    setSearchDrinks(false);
  };

  const handleClickMeals = () => {
    setSearchMeals(true);
    setSearchAll(false);
    setSearchDrinks(false);
  };

  const handleClickDrinks = () => {
    setSearchDrinks(true);
    setSearchMeals(false);
    setSearchAll(false);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleClickMeals }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickDrinks }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickAll }
        >
          All
        </button>

      </div>
      {searchAll
      && (doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ recipe.type === 'meal' ? (`/meals/${recipe.id}`)
              : (`/drinks/${recipe.id}`) }
          >
            <img
              className="imgDom"
              src={ recipe.image }
              alt={ `Img-${index}` }
              role="presentation"
              data-testid={ `${index}-horizontal-image` }
              width="300"
              height="300"
            />
          </Link>
          <Link
            to={ recipe.type === 'meal' ? (`/meals/${recipe.id}`)
              : (`/drinks/${recipe.id}`) }
          >
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}

            </p>
          </Link>
          {recipe.type === 'meal' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.alcoholicOrNot}`}
              </p>
            )}
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((e) => (
            <p key={ e } data-testid={ `${index}-${e}-horizontal-tag` }>{e}</p>
          ))}
          {/* <ShareButton index={ index } recipe={ recipe } /> */}
          <ShareProduct
            index={ index }
            recipe={ recipe }
          />
        </div>
      )))}

      {searchMeals
      && doneRecipes.filter((e) => e.type === 'meal').map((recipe, index) => (
        <div key={ recipe.name }>
          <Link
            to={ (`/meals/${recipe.id}`) }
            data-testid={ `${index}-horizontal-image` }
          >
            <img
              className="imgDom"
              src={ recipe.image }
              alt={ `Img-${index}` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </p>

          <Link to={ (`/meals/${recipe.id}`) }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((e) => (
            <p key={ e } data-testid={ `${index}-${e}-horizontal-tag` }>{e}</p>
          ))}
          {/* <ShareButton index={ index } recipe={ recipe } /> */}
          <ShareProduct
            index={ index }
            recipe={ recipe }
          />
        </div>
      ))}

      {searchDrinks
      && doneRecipes.filter((e) => e.type === 'drink').map((recipe, index) => (
        <div key={ recipe.name }>
          <Link to={ (`/drinks/${recipe.id}`) }>
            <img
              className="imgDom"
              src={ recipe.image }
              alt={ `Img-${index}` }
              role="presentation"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.alcoholicOrNot}`}
          </p>

          <Link to={ (`/drinks/${recipe.id}`) }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>

          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((e) => (
            <p key={ e } data-testid={ `${index}-${e}-horizontal-tag` }>{e}</p>
          ))}
          {/* <ShareButton index={ index } recipe={ recipe } /> */}
          <ShareProduct
            index={ index }
            recipe={ recipe }
          />
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;

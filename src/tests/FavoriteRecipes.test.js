import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
// import recipesMock from './Mocks/RecipesMock';
// import App from '../App';
import recipeSMock from './Mocks/RecipesMock';

// O beforeEach vai rodar antes de cada teste

describe('Testa a pagina FavoritesRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeSMock));
  });
  const mealProduct = () => {
    const imageSpicy = screen.getByAltText(/Img-0/i);
    expect(imageSpicy).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    const textMeal = screen.getByTestId('0-horizontal-top-text');
    expect(textMeal).toBeInTheDocument();
    const nameMeal = screen.getByTestId('0-horizontal-name');
    expect(nameMeal).toBeInTheDocument();
    const favoriteMeal = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteMeal).toBeInTheDocument();
    const shareMeal = screen.getByTestId('0-horizontal-share-btn');
    expect(shareMeal).toBeInTheDocument();
  };

  const drinkProduct = (index) => {
    const imageAquamarine = screen.getByAltText(`Img-${index}`);
    expect(imageAquamarine).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    const textDrink = screen.getByTestId(`${index}-horizontal-top-text`);
    expect(textDrink).toBeInTheDocument();
    expect(textDrink.textContent).toBe('Alcoholic - Cocktail');
    const nameDrink = screen.getByTestId(`${index}-horizontal-name`);
    expect(nameDrink).toBeInTheDocument();
    const favoriteDrink = screen.getByTestId(`${index}-horizontal-favorite-btn`);
    expect(favoriteDrink).toBeInTheDocument();
    const shareDrink = screen.getByTestId(`${index}-horizontal-share-btn`);
    expect(shareDrink).toBeInTheDocument();
  };

  test('Verifica se os botões all, Meals e Drinks são renderizados na tela', async () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);

    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(getLocalStorage);
    history.push('/favorite-recipes');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    const titleRecipes = screen.getByRole('heading', { value: 1, name: /Favorite Recipes/i });
    expect(titleRecipes).toBeInTheDocument();

    const buttonAll = screen.getByTestId('filter-by-all-btn');
    expect(buttonAll).toBeInTheDocument();
    const quantProducts = screen.getAllByTestId(/horizontal-favorite-btn/i);
    expect(quantProducts).toHaveLength(2);
    userEvent.click(buttonAll);

    mealProduct();
    drinkProduct(1);

    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
    mealProduct();
    const quantMeal = screen.getAllByTestId(/horizontal-favorite-btn/i);
    expect(quantMeal).toHaveLength(1);

    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    drinkProduct(0);
    const quantDrink = screen.getAllByTestId(/horizontal-favorite-btn/i);
    expect(quantDrink).toHaveLength(1);

    userEvent.click(buttonAll);

    const removeMeal = screen.getByAltText('0-Icone-Favorito');
    userEvent.click(removeMeal);

    const removeDrink = screen.getByAltText('0-Icone-Favorito');
    userEvent.click(removeDrink);
  });
});

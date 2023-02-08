import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import ingredietMock from './Mocks/IngredientMock';
import Drink11410Mock from './Mocks/Drink11410Mock';

describe('Testando o RecipesProgress', () => {
  test('RecipesProgress', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn(async () => ({
      json: async () => Drink11410Mock,
    }));

    history.push('/drinks/11410/in-progress');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/11410/in-progress');
    });

    const titleRecipes = screen.getByRole('heading', { value: 2, name: /Recipe in Progress/i });
    expect(titleRecipes).toBeInTheDocument();

    const apiDrink11410Mock = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11410';

    // expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiDrink11410Mock);

    const imageRef = screen.getByAltText(/meal-thumbnail/i);
    expect(imageRef).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/xhl8q31504351772.jpg');

    const titleProduct = screen.getByTestId('recipe-title');
    expect(titleProduct).toBeInTheDocument();

    const arrayCheck = 4;
    for (let i = 0; i < arrayCheck; i += 1) {
      const checked = screen.getByTestId(`${i}-ingredient-step`);
      userEvent.click(checked);
      expect(checked).toBeInTheDocument();
    }

    const buttonFinish = screen.getByTestId('finish-recipe-btn');
    expect(buttonFinish).toBeInTheDocument();
    userEvent.click(buttonFinish);
  });
});

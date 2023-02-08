import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals52874Mock from './Mocks/Meals52874Mock';

describe('Testando o RecipesProgress', () => {
  test('RecipesProgress', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn(async () => ({
      json: async () => meals52874Mock,
    }));

    history.push('/meals/52874/in-progress');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52874/in-progress');
    });

    const titleRecipes = screen.getByRole('heading', { value: 2, name: /Recipe in Progress/i });
    expect(titleRecipes).toBeInTheDocument();

    const apiMeals52874 = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52874';

    // expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiMeals52874);

    const imageRef = screen.getByAltText(/meal-thumbnail/i);
    expect(imageRef).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg');

    const titleProduct = screen.getByTestId('recipe-title');
    expect(titleProduct).toBeInTheDocument();

    const arrayCheck = 15;
    for (let i = 0; i < arrayCheck; i += 1) {
      const checked = screen.getByTestId(`${i}-ingredient-step`);
      userEvent.click(checked);
      expect(checked).toBeInTheDocument();
    }
  });
});

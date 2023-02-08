import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ingredietMock from './Mocks/IngredientMock';
import nameMock from './Mocks/NameMock';
import letterMock from './Mocks/LetterMock';
import nullMock from './Mocks/NullMock';
import oneFoodMock from './Mocks/OneFoodMock';
// import categoryMealsMock from './Mocks/CategoryMealsMock';

describe('Testando a SearchBar', () => {
  test('Testando campos de busca', async () => {
    const { history } = renderWithRouter(<App />);
    // renderWithRouter(<App />);
    // Tela Login
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(email, 'xablau@xablau.com');
    userEvent.type(password, '12345678');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    // Categories

    // global.fetch = jest.fn(async () => ({
    //   json: async () => categoryMealsMock,
    // }));

    // expect(inputSearch).toBeInTheDocument();
    // userEvent.type(inputSearch, 'Beef');
    // expect(inputSearch).toHaveValue('Beef');

    // expect(ingredientSearch).toBeInTheDocument();
    // userEvent.click(ingredientSearch);
    // userEvent.click(buttonSearch);

    // const apiCategoryMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    // (ingredietMock.meals).map(({ strMeal }) => async () => {
    //   const element = await screen.findByText(strMeal);
    //   expect(element).toBeInTheDocument();
    // });
    // expect(global.fetch).toHaveBeenCalledTimes(1);
    // expect(global.fetch).toHaveBeenCalledWith(apiCategoryMeals);

    // const buttonBeef = screen.getByTestId('Beef-category-filter')

    // Search

    const searchTop = screen.getByTestId('search-top-btn');
    expect(searchTop).toBeInTheDocument();
    userEvent.click(searchTop);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Meals');

    const inputSearch = screen.getByTestId('search-input');
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    // Busca por ingredientes

    global.fetch = jest.fn(async () => ({
      json: async () => ingredietMock,
    }));

    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Beef');
    expect(inputSearch).toHaveValue('Beef');

    expect(ingredientSearch).toBeInTheDocument();
    userEvent.click(ingredientSearch);
    userEvent.click(buttonSearch);

    const apiIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Beef';

    (ingredietMock.meals).map(({ strMeal }) => async () => {
      const element = await screen.findByText(strMeal);
      expect(element).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiIngredient);

    // Testando Recipe / meals

    const imgButton = await screen.findByRole('button', { name: /Beef and Mustard Pie/i });
    expect(imgButton).toBeInTheDocument();
    userEvent.click(imgButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52874');
    });

    history.push('/meals');

    const searchTopButton = screen.getByTestId('search-top-btn');
    expect(searchTopButton).toBeInTheDocument();
    userEvent.click(searchTopButton);

    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    const buttonSearchBar = screen.getByTestId('exec-search-btn');

    // Busca Null(pelo nome)

    const inputSearchBar = screen.getByTestId('search-input');
    expect(inputSearchBar).toBeInTheDocument();

    global.fetch = jest.fn(async () => ({
      json: async () => nullMock,
    }));

    userEvent.type(inputSearchBar, 'kkkk');
    expect(inputSearchBar).toHaveValue('kkkk');

    expect(nameSearch).toBeInTheDocument();
    userEvent.click(nameSearch);
    userEvent.click(buttonSearchBar);

    const apiNull = 'https://www.themealdb.com/api/json/v1/1/search.php?s=kkkk';

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiNull);
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Busca por Nome

    userEvent.clear(inputSearchBar);

    global.fetch = jest.fn(async () => ({
      json: async () => nameMock,
    }));

    expect(inputSearchBar).toBeInTheDocument();
    userEvent.type(inputSearchBar, 'Rice');
    expect(inputSearchBar).toHaveValue('Rice');

    expect(nameSearch).toBeInTheDocument();
    userEvent.click(nameSearch);
    userEvent.click(buttonSearchBar);

    const apiName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Rice';

    const foodName = await screen.findByText(/Japanese gohan rice/i);
    expect(foodName).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiName);

    // Busca por Letra

    userEvent.clear(inputSearchBar);

    global.fetch = jest.fn(async () => ({
      json: async () => letterMock,
    }));

    expect(inputSearchBar).toBeInTheDocument();
    userEvent.type(inputSearchBar, 'a');
    expect(inputSearchBar).toHaveValue('a');

    expect(firstLetterSearch).toBeInTheDocument();
    userEvent.click(firstLetterSearch);
    userEvent.click(buttonSearchBar);

    const apiLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

    (letterMock.meals).map(({ strMeal }) => async () => {
      const food = await screen.findByText(strMeal);
      expect(food).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiLetter);

    // Testando com duas letras 'aa'
    userEvent.clear(inputSearchBar);

    expect(inputSearchBar).toBeInTheDocument();
    userEvent.type(inputSearchBar, 'aa');
    expect(inputSearchBar).toHaveValue('aa');

    expect(firstLetterSearch).toBeInTheDocument();
    userEvent.click(firstLetterSearch);
    userEvent.click(buttonSearchBar);

    // Testando o windows.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Busca com apenas 1 elemento (pelo nome)

    userEvent.clear(inputSearchBar);

    global.fetch = jest.fn(async () => ({
      json: async () => oneFoodMock,
    }));

    expect(inputSearchBar).toBeInTheDocument();
    userEvent.type(inputSearchBar, 'Pizza');
    expect(inputSearchBar).toHaveValue('Pizza');

    expect(nameSearch).toBeInTheDocument();
    userEvent.click(nameSearch);
    userEvent.click(buttonSearchBar);

    const apiOneFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Pizza';

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(apiOneFood);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53014');
    });
  });
});

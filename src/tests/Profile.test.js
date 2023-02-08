import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

jest.mock('clipboard-copy'); // adicionando a biblioteca

describe('Verifica funcionalidades da página de Profile', () => {
  function mealsFood() {
    const imgMeal = screen.getByAltText(/Img-0/i);
    expect(imgMeal).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    const mealsLink = screen.getByRole('link', { name: /Spicy Arrabiata Penne/i });
    expect(mealsLink).toBeInTheDocument();
    const doneText = screen.getByText(/Italian - Vegetarian/i);
    expect(doneText).toBeInTheDocument();
    const doneDate = screen.getByTestId('0-horizontal-done-date');
    expect(doneDate).toBeInTheDocument();
    const doneTag1 = screen.getByText(/Pasta/i);
    expect(doneTag1).toBeInTheDocument();
    const doneTag2 = screen.getByText(/Curry/i);
    expect(doneTag2).toBeInTheDocument();
  }

  function drinkFood(id) {
    const imgDrink = screen.getByAltText(`Img-${id}`);
    expect(imgDrink).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    const drinkLink = screen.getByRole('link', { name: /Aquamarine/i });
    expect(drinkLink).toBeInTheDocument();
    const doneTextDrink = screen.getByText(/Alcoholic/i);
    expect(doneTextDrink).toBeInTheDocument();
    const doneDateDrink = screen.getByTestId(`${id}-horizontal-done-date`);
    expect(doneDateDrink).toBeInTheDocument();
    const doneDrinkTag = screen.getByText(/Limon/i);
    expect(doneDrinkTag).toBeInTheDocument();
  }
  it('testa se a tela Profile possui todos os botôes', async () => {
    const { history } = renderWithRouter(<App />);

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

    // Testando o Profile

    const profile = screen.getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    userEvent.click(profile);

    const titleProfile = screen.getByRole('heading', { name: /Profile/i, value: 1 });
    expect(titleProfile.textContent).toBe('Profile');

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail.textContent).toBe('xablau@xablau.com ');
    expect(localStorage.getItem('user')).toBeTruthy();

    const DoneButton = screen.getByTestId('profile-done-btn');
    expect(DoneButton).toBeInTheDocument();

    const FavoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(FavoriteButton).toBeInTheDocument();

    const LogoutButton = screen.getByTestId('profile-logout-btn');
    expect(LogoutButton).toBeInTheDocument();

    // Botões do Profile

    // Testando o Done Recipes
    userEvent.click(DoneButton);
    // history.push('/done-recipes');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
    // Testando o DoneRecipes
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    const buttonAll = screen.getByTestId('filter-by-all-btn');

    expect(buttonAll).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();

    // Button ALL
    userEvent.click(buttonAll);
    mealsFood();
    drinkFood(1);

    // Button Meals
    userEvent.click(buttonMeals);
    mealsFood();

    const buttonShareMeal = screen.getByTestId('0-horizontal-share-btn');
    expect(buttonShareMeal).toBeInTheDocument();
    userEvent.click(buttonShareMeal);
    const shareText = screen.getByText(/Link copied!/i);
    expect(shareText).toBeInTheDocument();

    // Button Drinks
    userEvent.click(buttonDrinks);
    drinkFood(0);

    const buttonShareDrink = screen.getByTestId('0-horizontal-share-btn');
    expect(buttonShareDrink).toBeInTheDocument();
    userEvent.click(buttonShareDrink);
    const shareDrinkText = screen.getByText(/Link copied!/i);
    expect(shareDrinkText).toBeInTheDocument();

    // Retornando ao Profile
    history.push('/profile');

    // Testando a o Favorite Recipes
    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    // Retornando ao Profile
    history.push('/profile');

    // Testando o Logout
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});

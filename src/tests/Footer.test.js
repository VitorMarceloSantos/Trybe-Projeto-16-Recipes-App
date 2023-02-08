import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Verifica o componente Footer', () => {
  test('Testa se o clicar no icon "drinks" rediriciona para a rota /drinks', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');

    expect(drinksButton).toBeInTheDocument();

    userEvent.click(drinksButton);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Testa se o clicar no icon "meals" rediriciona para a rota /meals', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(mealsButton).toBeInTheDocument();

    userEvent.click(mealsButton);

    expect(history.location.pathname).toBe('/meals');
  });
});

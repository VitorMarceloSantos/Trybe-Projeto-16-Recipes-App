/* const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1';
const MEAL_API = 'https://www.themealdb.com/api/json/v1/1';

async function getDrinkById(id) {
  const url = `${DRINK_API}/lookup.php?i=${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => (data.drinks ? data.drinks[0] : null));
}

async function getMealById(id) {
  const url = `${MEAL_API}/lookup.php?i=${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => (data.meals ? data.meals[0] : null));
}

export { getDrinkById, getMealById }; */

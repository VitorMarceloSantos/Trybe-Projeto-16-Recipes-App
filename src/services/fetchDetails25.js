async function fetchIdRecipes(history, setRecipeDetails) {
  const { pathname } = history.location;

  const id = pathname.split('/')[2];

  const endMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const endDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (pathname === `/meals/${id}`) {
    const { meals } = await fetch(endMeals).then((result) => result.json());
    setRecipeDetails(meals[0]);
  } if (pathname === `/drinks/${id}`) {
    const { drinks } = await fetch(endDrinks).then((result) => result.json());
    setRecipeDetails(drinks[0]);
  }
}

export default fetchIdRecipes;

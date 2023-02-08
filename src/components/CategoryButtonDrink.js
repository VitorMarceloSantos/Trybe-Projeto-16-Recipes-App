import React, { useState, useEffect, useContext } from 'react';
import { filterButtonCategoryDrinks } from '../services/api';
import MyContext from '../context/Context';

function CategoryButtonDrink() {
  const { setDataSearchDrink } = useContext(MyContext);
  const [buttonDrink, setButtonDrink] = useState([]);
  const [toggie, setToggie] = useState(false);

  useEffect(() => {
    const apiRequest = async () => {
      try {
        const magicNumber = 5;
        const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(URL);

        const data = await response.json();
        return setButtonDrink((data.drinks).slice(0, magicNumber));
      } catch (error) {
        return error;
      }
    };
    apiRequest();
  }, []);

  const handleClick = async ({ target }) => {
    // const api = await filterButtonCategoryDrinks(target.value);
    // console.log(api);
    // setDataSearchDrink(api);

    const api = await filterButtonCategoryDrinks(target.value);

    if (toggie === false) {
      setDataSearchDrink(api);
      setToggie(true);
    }
    if (toggie === true) {
      setDataSearchDrink({});
      setToggie(false);
    }
  };

  return (
    <div>
      {buttonDrink.map((btn) => (
        <button
          type="button"
          key={ btn.strCategory }
          value={ btn.strCategory }
          data-testid={ `${btn.strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {btn.strCategory}

        </button>
      ))}
    </div>
  );
}

export default CategoryButtonDrink;

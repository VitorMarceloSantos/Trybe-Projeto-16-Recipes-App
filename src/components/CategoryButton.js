import React, { useState, useEffect, useContext } from 'react';
import { filterButtonCategoryMeals } from '../services/api';
import MyContext from '../context/Context';

function CategoryButton() {
  const { setDataSearch } = useContext(MyContext);
  const [button, setButton] = useState([]);
  const [toggie, setToggie] = useState(false);

  useEffect(() => {
    const apiRequest = async () => {
      const magicNumber = 5;
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const data = await response.json();

      return setButton((data.meals).slice(0, magicNumber));
    };
    apiRequest();
  }, []);

  const handleClick = async ({ target }) => {
    const api = await filterButtonCategoryMeals(target.value);
    if (toggie === false) {
      setDataSearch(api);
      setToggie(true);
    }
    if (toggie === true) {
      setDataSearch({});
      setToggie(false);
    }
  };

  return (
    <div>
      {button.map((btn) => (
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

export default CategoryButton;

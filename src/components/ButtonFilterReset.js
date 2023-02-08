import React, { useContext } from 'react';
import MyContext from '../context/Context';

function ButtonFilterReset() {
  const { setDataSearchDrink, setDataSearch } = useContext(MyContext);

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          setDataSearch({});
          setDataSearchDrink({});
        } }
      >
        All

      </button>
    </div>
  );
}

export default ButtonFilterReset;

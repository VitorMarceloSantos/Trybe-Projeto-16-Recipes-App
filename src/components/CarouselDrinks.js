import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import CarouselD from '../Bootstrap/CarouselDrinks';

function CarouselDrinks() {
  // const [carouselDrinks, setCarouselDrinks] = useState({});
  const { setCarouselDrinks, carouselDrinks } = useContext(MyContext);

  const lengthArray = (array) => {
    const NUMBER_SIX = 6;
    if ((array.drinks).length > NUMBER_SIX) {
      return (array.drinks).slice(0, NUMBER_SIX);
    }
    return (array.drinks).slice(0, array.drinks.length);
  };

  useEffect(() => {
    const apiRequest = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const data = await response.json();
      setCarouselDrinks(lengthArray(data));
    };
    apiRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h2>Recomendações de Bebidas</h2>
      {(Object.keys(carouselDrinks).length !== 0 && (
        <CarouselD />
      ))}
    </section>
  );
}

export default CarouselDrinks;

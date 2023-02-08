import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import CarouselF from '../Bootstrap/CarouselF';

function CarouselFood() {
  const { carouselFood, setCarouselFood } = useContext(MyContext);

  const lengthArray = (array) => {
    const NUMBER_SIX = 6;
    if ((array.meals).length > NUMBER_SIX) {
      return (array.meals).slice(0, NUMBER_SIX);
    }
    return (array.meals).slice(0, array.meals.length);
  };

  useEffect(() => {
    const apiRequest = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const data = await response.json();
      setCarouselFood(lengthArray(data));
    };
    apiRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h2>Recomendações de comidas</h2>
      {(Object.keys(carouselFood).length !== 0 && (
        <CarouselF />
      ))}
    </section>
  );
}

export default CarouselFood;

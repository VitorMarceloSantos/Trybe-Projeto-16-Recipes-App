import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MyContext from '../context/Context';
// import './Carousel.css';

function BootstrapCarouselMeals() {
  const { carouselFood } = useContext(MyContext);
  return (
    <Carousel slide={ false }>
      <Carousel.Item>

        <div>
          <button
            type="button"
            data-testid="0-recommendation-card"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselFood[0].strMealThumb }
              data-testid="0-card-img"
              alt={ `0-${carouselFood[0].strMeal}-alt` }
            />
            <h3 data-testid="0-recommendation-title">{carouselFood[0].strMeal}</h3>
          </button>

          <button
            data-testid="1-recommendation-card"
            type="button"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselFood[1].strMealThumb }
              data-testid="1-card-img"
              alt={ `1-${carouselFood[1].strMeal}-alt` }
            />
            <h3 data-testid="1-recommendation-title">{carouselFood[1].strMeal}</h3>
          </button>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div>
          <button
            data-testid="2-recommendation-card"
            type="button"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselFood[2].strMealThumb }
              data-testid="2-card-img"
              alt={ `2-${carouselFood[2].strMeal}-alt` }
            />
            <h3 data-testid="2-recommendation-title">{carouselFood[2].strMeal}</h3>
          </button>

          <button
            type="button"
            data-testid="3-recommendation-card"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselFood[3].strMealThumb }
              data-testid="3-card-img"
              alt={ `3-${carouselFood[3].strMeal}-alt` }
            />
            <h3 data-testid="3-recommendation-title">{carouselFood[3].strMeal}</h3>
          </button>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div>
          <button
            type="button"
            data-testid="4-recommendation-card"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselFood[4].strMealThumb }
              data-testid="4-card-img"
              alt={ `4-${carouselFood[4].strMeal}-alt` }
            />
            <h3 data-testid="4-recommendation-title">{carouselFood[4].strMeal}</h3>
          </button>

          <button
            type="button"
            data-testid="5-recommendation-card"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselFood[5].strMealThumb }
              data-testid="5-card-img"
              alt={ `5-${carouselFood[5].strMeal}-alt` }
            />
            <h3 data-testid="5-recommendation-title">{carouselFood[5].strMeal}</h3>
          </button>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default BootstrapCarouselMeals;

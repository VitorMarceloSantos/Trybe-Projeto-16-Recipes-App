import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MyContext from '../context/Context';

function BootstrapCarouselDrinks() {
  const { carouselDrinks } = useContext(MyContext);
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
              src={ carouselDrinks[0].strDrinkThumb }
              data-testid="0-card-img"
              alt={ `0-${carouselDrinks[0].strDrink}-alt` }
            />
            <h3 data-testid="0-recommendation-title">{carouselDrinks[0].strDrink}</h3>
          </button>

          <button
            data-testid="1-recommendation-card"
            type="button"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselDrinks[1].strDrinkThumb }
              data-testid="1-card-img"
              alt={ `1-${carouselDrinks[1].strDrink}-alt` }
            />
            <h3 data-testid="1-recommendation-title">{carouselDrinks[1].strDrink}</h3>
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
              src={ carouselDrinks[2].strDrinkThumb }
              data-testid="2-card-img"
              alt={ `2-${carouselDrinks[2].strDrink}-alt` }
            />
            <h3 data-testid="2-recommendation-title">{carouselDrinks[2].strDrink}</h3>
          </button>

          <button
            type="button"
            data-testid="3-recommendation-card"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselDrinks[3].strDrinkThumb }
              data-testid="3-card-img"
              alt={ `3-${carouselDrinks[3].strDrink}-alt` }
            />
            <h3 data-testid="3-recommendation-title">{carouselDrinks[3].strDrink}</h3>
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
              src={ carouselDrinks[4].strDrinkThumb }
              data-testid="4-card-img"
              alt={ `4-${carouselDrinks[4].strDrink}-alt` }
            />
            <h3 data-testid="4-recommendation-title">{carouselDrinks[4].strDrink}</h3>
          </button>

          <button
            type="button"
            data-testid="5-recommendation-card"
          // onClick={} redirecionar para tela de detalhes
          >
            <img
              src={ carouselDrinks[5].strDrinkThumb }
              data-testid="5-card-img"
              alt={ `5-${carouselDrinks[5].strDrink}-alt` }
            />
            <h3 data-testid="5-recommendation-title">{carouselDrinks[5].strDrink}</h3>
          </button>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default BootstrapCarouselDrinks;

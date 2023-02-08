import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkMenu from '../components/DrinkMenu';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" search />
      <DrinkMenu />
      <Footer />
    </div>

  );
}

export default Drinks;

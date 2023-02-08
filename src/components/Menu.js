import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FoodMenu from './FoodMenu';

function Menu() {
  return (
    <div>
      <Header title="Meals" search />
      Menu
      <FoodMenu />
      <Footer />
    </div>
  );
}

export default Menu;

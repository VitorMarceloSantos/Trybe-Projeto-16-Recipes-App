import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [searchBar, setSearchBar] = useState(false);
  const { title } = props;

  const history = useHistory();

  const goToProfile = () => history.push('/profile');

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button type="button" onClick={ goToProfile }>
        <img src={ ProfileIcon } data-testid="profile-top-btn" alt="Profile Top Icon" />
      </button>
      { (title === 'Meals' || title === 'Drinks') && (
        <button type="button" onClick={ () => setSearchBar(!searchBar) }>
          <img
            src={ SearchIcon }
            data-testid="search-top-btn"
            alt="Search Top Icon"
          />
        </button>
      )}
      {searchBar && <SearchBar /> }
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;

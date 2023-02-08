import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Context';

function Login() {
  const { userEmail, password, buttonDisable,
    setEmail, setPassword, setButtonDisable } = useContext(MyContext);
  const history = useHistory();
  // console.log(email, password, setEmail, setPassword, setButtonDisable);

  useEffect(() => {
    const six = 6;
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (password.length > six && regex.test(userEmail) === true) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  });

  const submitInfoChangePage = () => {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('drinksToken', JSON.stringify(1));
    setPassword('');
    setEmail('');

    history.push('/meals');
  };

  return (
    <main>

      <input
        type="email"
        value={ userEmail }
        placeholder="email"
        data-testid="email-input"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        value={ password }
        placeholder="password"
        data-testid="password-input"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="button"
        disabled={ buttonDisable }
        data-testid="login-submit-btn"
        onClick={ submitInfoChangePage }
      >
        Enter
      </button>
    </main>

  );
}

export default Login;

import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';


export const Header = ({ addTodo }) => (
  <header className={styles.header}>
    <h1>todos</h1>
  </header>
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;

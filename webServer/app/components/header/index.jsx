import React from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from '../../components/todo/TodoTextInput';

import styles from './index.css';

console.log('ac');
export const Header = ({ addTodo }) => (
  <header className={styles.header}>
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={(text) => {
        if (text.length !== 0) {
          addTodo(text);
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;

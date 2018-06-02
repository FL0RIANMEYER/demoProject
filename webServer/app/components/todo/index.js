import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

import styles from './index.css';

const TodoList = ({ filteredTodos, actions }) => (
  <ul className={styles.todoList}>
    {filteredTodos.map(todo =>
      <TodoItem key={todo.id} todo={todo} {...actions} />
    )}
  </ul>
);
console.log('a');
TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  actions: PropTypes.object.isRequired,
};

export default TodoList;

import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/footer';
import visibleTodoListContainer from '../../container/visibletodolist';
import todoListComponent from '../../components/todo';

import styles from './index.css';


const VisibleTodoList = visibleTodoListContainer(todoListComponent);

const MainSection = ({ todosCount, completedCount, actions }) =>
  (
    <section className={styles.main}>
      {
        !!todosCount &&
        <span>
          <input
            className={styles.toggleAll}
            type="checkbox"
            defaultChecked={completedCount === todosCount}
          />
          <label onClick={() => actions.completeAllTodos(completedCount !== todosCount)}/>
        </span>
      }
      <VisibleTodoList />
      {
        !!todosCount &&
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompleted}
        />
      }
  </section>
  );

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MainSection;

import React from 'react';
import PropTypes from 'prop-types';
import filterLinkContainer from '../../container/filterlink';
import linkComponent from '../../components/link';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/TodoFilters';

import styles from './index.css';


const FilterLink = filterLinkContainer(linkComponent);

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

const Footer = (props) => {
  const { activeCount, completedCount, onClearCompleted } = props;
  const itemWord = activeCount === 1 ? 'item' : 'items';
  return (
    <footer className={styles.footer}>
      <span className={styles.todoCount}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className={styles.filters}>
        {Object.keys(FILTER_TITLES).map(filter =>
          <li key={filter}>
            <FilterLink filter={filter}>
              {FILTER_TITLES[filter]}
            </FilterLink>
          </li>
        )}
      </ul>
      {
        !!completedCount &&
        <button
          className={styles.clearCompleted}
          onClick={onClearCompleted}
        >Clear completed</button>

      }
    </footer>
  );
};

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
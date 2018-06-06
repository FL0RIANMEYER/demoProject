import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';


const Link = ({ active, children, setFilter }) =>
  (
    <a
      className={active ? 'selected' : ''}
      style={{ cursor: 'pointer' }}
      onClick={() => setFilter()}
    >
      {children}
    </a>
  );


Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Link;

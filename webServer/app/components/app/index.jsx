import React from 'react';

import headerContainer from '../../container/header';
import headerComponent from '../../components/header';

const Header = headerContainer(headerComponent);

import styles from './index.css';
console.log('a');
const App = () => (
    <section className={styles.todoapp}>
        <Header />
    </section>
);

export default App;

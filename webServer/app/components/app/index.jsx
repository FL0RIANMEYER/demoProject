import React from 'react';

import headerContainer from '../../container/header';
import headerComponent from '../../components/header';
import mainSectionContainer from '../../container/mainsection';
import mainSectionComponent from '../../components/mainsection';

const Header = headerContainer(headerComponent);
const MainSection = mainSectionContainer(mainSectionComponent);

import styles from './index.css';

const App = () => (
    <section className={styles.todoapp}>
        <Header />
        <MainSection />
    </section>
);

export default App;

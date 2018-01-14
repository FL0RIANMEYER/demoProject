import React    from 'react';
import { pure } from 'recompose'

import styles from './component.scss';


export default pure(({ onSubmit = () => {}, onDelete = () => {}, todos }) => {
    return (
        <div className={styles.component}>
            <form id="form" onSubmit={onSubmit}>
                <input className={styles.input} type="text" name="task" placeholder="ToDo"></input>
                <button className={styles.button} type="submit" >Send</button>
            </form>
            <div id="todos">
                { todos.filter(e => e != null).map((entry, i) => (
                    <div className={styles.entry} key={i} onClick={() => onDelete(entry._id)}>{ entry.todo }</div>
                )) }
            </div>
        </div>
    );
});

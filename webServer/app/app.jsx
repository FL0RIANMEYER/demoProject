import React            from 'react';
import ReactDOM         from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Component from './component.jsx';
import styles    from './app.scss';

import AjaxHandler from './ajaxHandler';


const ajaxHandler = new AjaxHandler();


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { todos: [] };

        this.updateTodos = this.updateTodos.bind(this);

        ajaxHandler.setUpdate(this.updateTodos);
    }

    updateTodos(todos) {
        this.setState({ todos });
    }

    render() {
        return (
            <div className={styles.app}>
                <Component onSubmit={ajaxHandler.submit} onDelete={ajaxHandler.delete} todos={this.state.todos} />
            </div>
        );
    }
}


ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('root'));

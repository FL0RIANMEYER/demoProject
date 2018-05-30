import React from 'react';
import {createRenderer} from 'react-test-renderer/shallow';
import TodoList from '../../../../app/components/todo';
import TodoItem from '../../../../app/components/todo/TodoItem';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

const setup = () => {
    const props = {
        filteredTodos: [
            {
                text: 'Use Redux',
                completed: false,
                id: 0,
            }, {
                text: 'Run the tests',
                completed: true,
                id: 1,
            },
        ],
        actions: {
            editTodo: sinon.spy(),
            deleteTodo: sinon.spy(),
            completeTodo: sinon.spy(),
            completeAll: sinon.spy(),
            clearCompleted: sinon.spy(),
        },
    };

    const renderer = createRenderer();
    renderer.render(<TodoList {...props}/>);
    const output = renderer.getRenderOutput();

    return {props: props, output: output};
};

describe('components', () => {
    describe('TodoList', () => {
        it('should render container', () => {
            const {output} = setup();
            expect(output.type).to.be.equal('ul');
            expect(output.props.className).to.be.equal('todoList');
        });

        it('should render todos', () => {
            const {output, props} = setup();
            expect(output.props.children.length).to.be.equal(2);
            output.props.children.forEach((todo, i) => {
                expect(todo.type).to.be.equal(TodoItem);
                expect(Number(todo.key)).to.be.equal(props.filteredTodos[i].id);
                expect(todo.props.todo).to.be.equal(props.filteredTodos[i]);
            });
        });
    });
});

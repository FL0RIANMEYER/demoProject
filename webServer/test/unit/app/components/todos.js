import todos from '../../../../app/reducers/todos';
import * as types from '../../../../app/constants/ActionTypes';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

describe('todos reducer', () => {
    it('should handle initial state', () => {
        expect(todos(undefined, {})).to.be.deep.equal([]);
    });

    it('should handle DELETE_TODO', () => {
        expect(todos([
            {
                text: 'Use Redux',
                completed: false,
                id: 0,
            }, {
                text: 'Run the tests',
                completed: false,
                id: 1,
            },
        ], {
            type: types.DELETE_TODO,
            id: 1,
        })).to.be.deep.equal([
            {
                text: 'Use Redux',
                completed: false,
                id: 0,
            },
        ]);
    });

    it('should handle COMPLETE_TODO', () => {
        expect(todos([
            {
                text: 'Run the tests',
                completed: false,
                id: 1,
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0,
            },
        ], {
            type: types.COMPLETE_TODO,
            id: 1,
        })).to.be.deep.equal([
            {
                text: 'Run the tests',
                completed: true,
                id: 1,
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0,
            },
        ]);
    });

    it('should handle COMPLETE_ALL_TODOS', () => {
        expect(todos([
            {
                text: 'Run the tests',
                completed: true,
                id: 1,
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0,
            },
        ], {type: types.COMPLETE_ALL_TODOS})).to.be.deep.equal([
            {
                text: 'Run the tests',
                completed: true,
                id: 1,
            }, {
                text: 'Use Redux',
                completed: true,
                id: 0,
            },
        ]);

        // Unmark if all todos are currently completed
        expect(todos([
            {
                text: 'Run the tests',
                completed: true,
                id: 1,
            }, {
                text: 'Use Redux',
                completed: true,
                id: 0,
            },
        ], {type: types.COMPLETE_ALL_TODOS})).to.be.deep.equal([
            {
                text: 'Run the tests',
                completed: false,
                id: 1,
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0,
            },
        ]);
    });

    it('should handle CLEAR_COMPLETED', () => {
        expect(todos([
            {
                text: 'Run the tests',
                completed: true,
                id: 1,
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0,
            },
        ], {type: types.CLEAR_COMPLETED})).to.be.deep.equal([
            {
                text: 'Use Redux',
                completed: false,
                id: 0,
            },
        ]);
    });

    it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
        expect([
            {
                type: types.COMPLETE_TODO,
                id: 0,
            }, {
                type: types.CLEAR_COMPLETED,
            },
        ].reduce(todos, [
            {
                id: 0,
                completed: false,
                text: 'Use Redux',
            }, {
                id: 1,
                completed: false,
                text: 'Write tests',
            },
        ])).to.be.deep.equal([
            {
                text: 'Write tests',
                completed: false,
                id: 1,
            },
        ]);
    });
});

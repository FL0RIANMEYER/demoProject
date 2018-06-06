import * as types from '../constants/ActionTypes';

export const addTodo = text => ({
    type: types.ADD_TODO,
    body: {
        text,
    },
    ajax: true,
    path: 'todo',
    method: 'post',
});
export const deleteTodo = id => ({
    type: types.DELETE_TODO,
    ajax: true,
    id,
    path: 'todo/' + id,
    method: 'delete',
});
export const getTodos = () => ({
    type: types.GET_TODOS,
    ajax: true,
    path: 'todo',
    method: 'get',
});
export const editTodo = (id, text) => ({
    type: types.EDIT_TODO,
    body: {
        text,
    },
    id,
    ajax: true,
    path: 'todo/' + id,
    method: 'patch',
});
export const completeTodo = (id, completed) => ({
    type: types.COMPLETE_TODO,
    body: {
        completed,
    },
    id,
    ajax: true,
    path: 'todo/' + id,
    method: 'patch',
});
export const completeAllTodos = (completed) => ({
    type: types.COMPLETE_ALL_TODOS,
    body: {
        completed: completed,
    },
    ajax: true,
    path: 'todo/all',
    method: 'patch',
});
export const clearCompleted = () => ({
    type: types.CLEAR_COMPLETED,
    completed: true,
    ajax: true,
    path: 'todo/all',
    method: 'delete',
});

export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter});

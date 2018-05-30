import {
    GET_TODOS,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL_TODOS,
    CLEAR_COMPLETED,
    AJAX_RESPONSE,
} from '../constants/ActionTypes';

const initialState = [];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case AJAX_RESPONSE:
            switch (action.requestType) {
                case GET_TODOS:
                return [
                    ...action.response,
                ];
                case ADD_TODO:
                    return [
                        ...state, {
                            id: action.response.id,
                            completed: false,
                            text: action.response.text,
                        },
                    ];
            } break;

        case DELETE_TODO:
            return state.filter(todo => todo.id != action.id);

        case EDIT_TODO:
            return state.map(
                todo => todo.id == action.id
                ? {
                    ...todo,
                    text: action.body.text,
                }
                : todo);

        case COMPLETE_TODO:
            return state.map(
                todo => todo.id === action.id
                ? {
                    ...todo,
                    completed: !todo.completed,
                }
                : todo);

        case COMPLETE_ALL_TODOS:
            const areAllMarked = state.every(todo => todo.completed);
            return state.map(todo => ({
                ...todo,
                completed: !areAllMarked,
            }));

        case CLEAR_COMPLETED:
            return state.filter(todo => todo.completed === false);
    }
    return state;
}

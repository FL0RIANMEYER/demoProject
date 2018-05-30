import { AJAX_RESPONSE } from '../constants/ActionTypes';
import store from '../store';

const xmlhttp = new XMLHttpRequest();

/**
 * listen for actions with ajax!=undefined flag and dispatch response message
 * @param  {Object} dispatch
 * @return {Function}
 */
export default ({ dispatch }) => next => action => {
    next(action);
    if(!action.ajax) { return; }


    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState != XMLHttpRequest.DONE ) { return; }

        let response;
        let header = {
            'X-RateLimit-Limit':     xmlhttp.getResponseHeader('X-RateLimit-Limit'),
            'X-RateLimit-Remaining': xmlhttp.getResponseHeader('X-RateLimit-Remaining'),
        };

        try { response = JSON.parse(xmlhttp.responseText); }
        catch (e) { response = xmlhttp.responseText; }

        dispatch({
            type: AJAX_RESPONSE,
            requestType: action.type,
            response,
            header,
        });
    };

    xmlhttp.open(
        action.method || 'GET',
        '/' + action.path + (action.query ? '?' + action.query.join('&') : ''),
        true);

    if(action.token) { xmlhttp.setRequestHeader('Authorization', `Bearer ${action.token}`); }


    const payload = Object.assign({}, action.body);
    const user    = store.getState().user;

    payload.token = user && user.token;

    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(action.body ? JSON.stringify(payload) : '');
};

import request from 'superagent';
import { AJAX_RESPONSE } from '../constants/ActionTypes';

/**
 * listen for actions with ajax!=undefined flag and dispatch response message
 * @param  {Object} dispatch
 * @return {Function}
 */
export default ({ dispatch }) => next => action => {
    next(action);
    if(!action.ajax) { return; }

    // const payload = Object.assign({}, action.body);

    request[action.method]('/' + action.path)
        .set('Content-Type', 'application/json')
        // .send(JSON.stringify(action.body ? JSON.stringify(payload) : ''))
        .send(action.body)
        .then(res => {
            let response;

            try { response = JSON.parse(res.text); }
            catch (e) { response = res.text; }

            dispatch({
                type: AJAX_RESPONSE,
                requestType: action.type,
                response,
            });
        }).catch((err) => { console.error(err); });
};

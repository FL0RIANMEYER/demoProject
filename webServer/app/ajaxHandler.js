import request from 'superagent';

const AjaxHandler = function() {
    const responseHandler = (error, response) =>
        this.updateTodos && this.updateTodos((response.body || []).slice(-5));

    this.todos = [];

    request
        .get('/todo')
        .end(responseHandler);

    this.setUpdate = (fn) => this.updateTodos = fn;

    this.delete = id => {
        request
            .delete('/todo')
            .send({ id })
            .end(responseHandler);
    };

    this.submit = event => {
        const task = event.currentTarget.task.value;

        event.preventDefault();

        request
            .post('/todo')
            .send({ task })
            .end(responseHandler);
    };


}

export default AjaxHandler;

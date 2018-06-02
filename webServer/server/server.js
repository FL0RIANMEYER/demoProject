import express    from 'express';
import bodyParser from 'body-parser';
import routes         from './routes';
import ssr from './ssr';

const Server = function(port) {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public', {
        index: false,
    }));
    app.use(routes);
    app.use(ssr);

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

export default Server;

import express    from 'express';
import bodyParser from 'body-parser';

import routes         from './routes';
import { staticPath } from '../config/config';

const Server = function(port) {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(routes);
    app.use(express.static(staticPath));
    console.log(staticPath);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

export default Server;

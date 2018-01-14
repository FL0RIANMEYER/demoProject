import path from 'path';
import { compiled } from './path';


const port = 3000;
const staticPath = path.join(compiled, 'client');


export         { port, staticPath }
export default { port, staticPath };

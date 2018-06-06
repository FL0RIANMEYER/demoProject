import { connect } from 'react-redux';
import { addTodo } from '../../actions';


export default Component => connect(null, { addTodo })(Component);

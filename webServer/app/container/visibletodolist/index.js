import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from '../../actions';
import { getVisibleTodos } from '../../selectors';


const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default Component => connect(mapStateToProps, mapDispatchToProps)(Component);

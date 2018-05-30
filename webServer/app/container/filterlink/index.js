import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

export default Component => connect(mapStateToProps, mapDispatchToProps)(Component);

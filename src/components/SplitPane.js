// container

import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import { changeSize } from '../actions/panels';

function mapDispatchToProps(dispatch, ownProps) {
    return {
      onChange : c => dispatch(changeSize(ownProps.className, c))
    }
}

export default connect(null, mapDispatchToProps)(SplitPane);
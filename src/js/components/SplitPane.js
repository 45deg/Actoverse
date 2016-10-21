// container

import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import { changePanelSize } from '../actions/ui';

function mapDispatchToProps(dispatch, ownProps) {
    return {
      onChange : c => dispatch(changePanelSize(ownProps.className, c))
    }
}

export default connect(null, mapDispatchToProps)(SplitPane);

// container

import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import { changePanelSize } from '../actions/ui';

function mapDispatchToProps(dispatch, ownProps) {
    return {
      onChange : c => dispatch(changePanelSize(c))
    }
}

export default connect(null, mapDispatchToProps)(SplitPane);

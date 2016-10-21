import React from 'react';
import { connect } from 'react-redux';
import { hideAlertModal } from '../actions/modal';

import { Modal, Button } from 'react-bootstrap';

import 'css/debug';

const AlertModal = ({ visibility, message, hideAlertModal }) => {
  return <Modal show={visibility} onHide={hideAlertModal}>
            <Modal.Header closeButton>
              <Modal.Title>Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={hideAlertModal}>Close</Button>
            </Modal.Footer>
          </Modal>;
}

function mapStateToProps(state) {
  return state.modal;
}

function mapDispatchToProps(dispatch) {
  return {
    hideAlertModal: () => dispatch(hideAlertModal())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertModal);

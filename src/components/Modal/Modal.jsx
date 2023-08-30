import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalElem } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log(e.key);
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { img, tags } = this.props.image;
    return (
      <ModalElem onClick={this.handleBackClose}>
        <div className="modal">
          <img src={img} alt={tags} />
        </div>
      </ModalElem>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};

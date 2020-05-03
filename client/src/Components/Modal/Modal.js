import React from 'react';

import './Modal.css';

const Modal = (props) => {
  const display = props.isOpen ? (
    <div className="backdrop">
      <div className="modal">
        <div className="modal__header">
          <p className="modal__header-close" onClick={props.closeModal}>
            X
          </p>
        </div>
        <div className="modal__body">
          <h1 className="modal__body-title">
            Are you sure you wish to delete this article? ({props.post.title})
          </h1>
        </div>
        <div className="modal__footer">
          <button
            className="modal__footer-button modal__footer-button-delete"
            onClick={() => props.deletePost(props.post._id)}
          >
            Delete
          </button>
          <button
            onClick={props.closeModal}
            className=" modal__footer-button modal__footer-button-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return display;
};

export default Modal;

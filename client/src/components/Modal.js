import React from 'react';

const Modal = (props) => {
  return (
    <div
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
      style={{ position: 'absolute' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
        style={{ position: 'relative' }}
      >
        <div className="header">{props.title}</div>
        <div className="scrolling content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>
  );
};

export default Modal;

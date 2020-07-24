import React from 'react';

const ConfirmationModal = (props) => {
  return (
    <div
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
      style={{ position: 'fixed' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui tiny modal visible active"
        style={{ position: 'flexible' }}
      >
        <div className="header">{props.title}</div>
        <div className="scrolling content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

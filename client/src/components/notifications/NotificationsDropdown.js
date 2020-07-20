import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotificationsDropdown = (props) => {
  return (
    <div
      className="ui small vertical left menu"
      style={{
        width: '70vw',
        maxWidth: '350px',
      }}
    >
      <div className="header">Notifications</div>
      <div className="divider"></div>
      <div
        className="item"
        style={{
          wordWrap: 'break-word',
          flex: 'inherit',
          whiteSpace: 'normal',
        }}
      >
        <div className="ui list">
          <div className="item">
            <div className="ui grid">
              <div
                className="three wide column"
                style={{ paddingRight: '0', margin: 'auto' }}
              >
                <img
                  className="ui avatar image"
                  src="https://media-exp1.licdn.com/dms/image/C4E03AQHzPwOsNs48qw/profile-displayphoto-shrink_400_400/0?e=1599091200&v=beta&t=C5PRlXqnsLsbRqRExh6XYloKo8lieAhFPa8bpkufx94"
                />
              </div>
              <div
                className="thirteen wide column"
                style={{ paddingLeft: '0px' }}
              >
                <div className="content">
                  <div className="header">Lindsay upvoted your post</div>
                  <div className="description small-text">10 hours ago.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="item read-background"
        style={{
          wordWrap: 'break-word',
          flex: 'inherit',
          whiteSpace: 'normal',
        }}
      >
        <div className="ui list">
          <div className="item">
            <div className="ui grid">
              <div
                className="three wide column"
                style={{
                  paddingRight: '0',
                  margin: 'auto',
                }}
              >
                <i
                  className="black check icon"
                  style={{ paddingLeft: '8px' }}
                ></i>
              </div>
              <div
                className="thirteen wide column"
                style={{ paddingLeft: '0px' }}
              >
                <div className="content">
                  <div className="description grey-text">
                    Your module request has been approved by admin
                  </div>
                  <div className="description small-text">yesterday</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="header center-text">
        <Link to="/notifications">
          {`See all notifications `}
          <i className="arrow right icon"></i>
        </Link>
      </div>
    </div>
  );
};

NotificationsDropdown.propTypes = {};

export default NotificationsDropdown;

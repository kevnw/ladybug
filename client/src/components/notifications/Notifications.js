import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { Dropdown, Menu } from 'semantic-ui-react';

const Notifications = (props) => {
  return (
    <div>
      <div className="container-body">
        <Alert />
        <div className="ui stackable grid">
          <div className="twelve wide centered column">
            <h1 className="red-text">Notifications</h1>
            <div className="ui red segment">
              <div className="ui comments">
                <div className="comment">
                  <Dropdown
                    icon="ellipsis vertical"
                    direction="left"
                    style={{ float: 'right' }}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item text="Mark as read" />
                      <Dropdown.Item text="Delete" />
                    </Dropdown.Menu>
                  </Dropdown>
                  <a className="avatar">
                    <i
                      className="black large check icon"
                      style={{ paddingLeft: '8px', margin: 'auto' }}
                    ></i>
                  </a>
                  <div className="content">
                    <a className="author">
                      Your module request has been approved by admin
                    </a>
                    <div className="text small-text">5 mins ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui segment" style={{ boxShadow: 'none' }}>
              <div className="ui comments">
                <div className="comment">
                  <Dropdown
                    icon="ellipsis vertical"
                    direction="left"
                    style={{ float: 'right' }}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item text="Mark as read" />
                      <Dropdown.Item text="Delete" />
                    </Dropdown.Menu>
                  </Dropdown>
                  <a className="avatar">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHzPwOsNs48qw/profile-displayphoto-shrink_400_400/0?e=1599091200&v=beta&t=C5PRlXqnsLsbRqRExh6XYloKo8lieAhFPa8bpkufx94" />
                  </a>
                  <div className="content">
                    <a
                      className="author grey-text"
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 'normal',
                      }}
                    >
                      Matt commented on your post
                    </a>
                    <div className="text small-text">5 mins ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <div className="ui hidden divider"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Notifications.propTypes = {};

export default Notifications;

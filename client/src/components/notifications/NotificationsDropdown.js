import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import NotificationsDropdownItem from './NotificationsDropdownItem';
import { getNotifications } from '../../actions/notification';

const NotificationsDropdown = ({
  getNotifications,
  notification: { notifications, loading },
}) => {
  useEffect(() => {
    getNotifications();
  }, []);
  const unreadNotifications = notifications.filter(
    (notification) => notification.read === false
  );
  return (
    !loading &&
    notifications &&
    unreadNotifications && (
      <Fragment>
        <Badge
          badgeContent={unreadNotifications.length}
          color="error"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          // invisible
        >
          <i className="bell icon" style={{ margin: 'auto' }}></i>
        </Badge>
        <div
          className="ui small vertical left menu"
          style={{
            width: '70vw',
            maxWidth: '350px',
          }}
        >
          <div className="header">Notifications</div>
          <div className="divider"></div>
          {notifications.length > 0 ? (
            notifications.map(
              (notification, index) =>
                index < 3 && (
                  <NotificationsDropdownItem
                    key={notification._id}
                    notification={notification}
                  />
                )
            )
          ) : (
            <div className="center-text small-text">
              You have no notifications
            </div>
          )}
          <div className="divider"></div>
          <div className="header center-text">
            <Link to="/notifications">
              {`See all notifications `}
              <i className="arrow right icon"></i>
            </Link>
          </div>
        </div>
      </Fragment>
    )
  );
};

NotificationsDropdown.propTypes = {
  notification: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps, { getNotifications })(
  NotificationsDropdown
);

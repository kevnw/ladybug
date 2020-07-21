import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import NotificationsItem from './NotificationsItem';
import { getNotifications } from '../../actions/notification';

const Notifications = ({
  getNotifications,
  notification: { notifications, loading },
}) => {
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    !loading && (
      <div>
        <div className="container-body">
          <Alert />
          <div className="ui stackable grid">
            <div className="ten wide centered column">
              <h1 className="red-text">Notifications</h1>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationsItem
                    key={notification._id}
                    notification={notification}
                  />
                ))
              ) : (
                <div>You have no notifications</div>
              )}
              <div className="ui hidden divider"></div>
              <div className="ui hidden divider"></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

Notifications.propTypes = {
  notification: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps, { getNotifications })(Notifications);

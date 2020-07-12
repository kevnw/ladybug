import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../img/logoweb.png';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  // const authLinks = (
  //   <div className="right menu ">
  //     <Link to="/home" className="item">
  //       Home
  //     </Link>
  //     <Link to="/explore" className="item">
  //       Explore
  //     </Link>
  //     <div className="ui simple dropdown vertically fitted item">
  //       <img
  //         className="ui avatar image xsmall-image"
  //         src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
  //         alt=""
  //       />
  //       <div className="ui small vertical menu">
  //         {/* CHANGE LINK !!!! */}
  //         <Link to="/#!" className="item">
  //           <i className="heart icon"></i>Saved posts
  //         </Link>
  //         <Link to="/#!" className="item">
  //           <i className="pencil icon"></i>Edit my interest
  //         </Link>
  //         <Link to="/profile/3" className="item">
  //           <i className="user icon"></i>Profile
  //         </Link>
  //         <Link to="/login" onClick={logout} className="item">
  //           <i className="sign-out icon"></i>Logout
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
  const guestLinks = (
    <div className="right menu ">
      <Link to="/register" onClick={logout} className="item">
        Register
      </Link>
      <Link to="/login" onClick={logout} className="item">
        Login
      </Link>
    </div>
  );

  return (
    <nav className="ui inverted fixed big menu navbar">
      <div className="ui container">
        <Link to="/" className="item">
          <img className="ui middle aligned tiny image" src={logo}></img>
        </Link>
        {!loading && (
          <Fragment>
            {' '}
            {isAuthenticated && user && user.verified ? (
              <div className="right menu ">
                <Link to="/home" className="item">
                  Home
                </Link>
                <Link to="/explore" className="item">
                  Explore
                </Link>
                {user.role == 'admin' && (
                  <Link to="/requests" className="item">
                    Requests
                  </Link>
                )}
                <div className="ui simple dropdown vertically fitted item">
                  <img
                    className="ui avatar image xsmall-image"
                    src={`${user.avatar}`}
                    alt=""
                  />
                  <div className="ui small vertical menu">
                    {/* CHANGE LINK !!!! */}
                    <Link to="/saved-posts" className="item">
                      <i className="heart icon"></i>Saved posts
                    </Link>
                    <Link to="/#!" className="item">
                      <i className="bell icon"></i>Notifications
                    </Link>
                    <Link to={`/profile/me`} className="item">
                      <i className="user icon"></i>Profile
                    </Link>
                    <Link to="/login" onClick={logout} className="item">
                      <i className="sign-out icon"></i>Logout
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              guestLinks
            )}{' '}
          </Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

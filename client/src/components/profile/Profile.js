import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import PostItem from '../posts/PostItem';
import Overview from './Overview';
import ProfileTop from './ProfileTop';
import BioFormModal from './BioFormModal';
import SkillsFormModal from './SkillsFormModal';
import HeaderFormModal from './HeaderFormModal';
import EducationFormModal from './EducationFormModal';
import ExperienceFormModal from './ExperienceFormModal';
import { getPostsByUser, getPostsByCurrentUser } from '../../actions/post';
import { getProfileById, getCurrentProfile } from '../../actions/profile';
import ProfilePosts from './ProfilePosts';

const Profile = ({
  match,
  getProfileById,
  getCurrentProfile,
  profile,
  auth,
}) => {
  useEffect(() => {
    if (match.params.id === 'me') {
      getCurrentProfile();
    } else {
      getProfileById(match.params.id);
    }
  }, [getProfileById, getCurrentProfile, match.params.id]);

  const [activeTab, setActiveTab] = useState('overview');
  const [isShowingBio, setShowingBio] = useState(false);
  const [isShowingSkills, setShowingSkills] = useState(false);
  const [isShowingHeader, setShowingHeader] = useState(false);
  const [isShowingEducation, setShowingEducation] = useState(false);
  const [isShowingExperience, setShowingExperience] = useState(false);
  const currentProfile = profile.profile;
  const profileLoading = profile.loading;

  const statistics = <div>Statistics</div>;
  // const posts = !loading && postsByUser && (
  //   <div>
  //     {postsByUser.length > 0 &&
  //       postsByUser.map((post) => <PostItem post={post} key={post._id} />)}
  //   </div>
  // );

  return (
    <Fragment>
      {currentProfile && !profileLoading && auth.user && (
        <div>
          <div className="container-body">
            <Alert />

            <div className="ui stackable grid">
              <div className="twelve wide centered column">
                <ProfileTop
                  user={auth.user}
                  profile={currentProfile}
                  setShowingHeader={setShowingHeader}
                />
                <div className="ui secondary pointing menu">
                  <a
                    onClick={() => setActiveTab('overview')}
                    className={`item ${
                      activeTab === 'overview' ? 'active' : ''
                    }`}
                  >
                    Overview
                  </a>
                  <a
                    onClick={() => setActiveTab('statistics')}
                    className={`item ${
                      activeTab === 'statistics' ? 'active' : ''
                    }`}
                  >
                    Statistics
                  </a>
                  <a
                    onClick={() => setActiveTab('posts')}
                    className={`item ${activeTab === 'posts' ? 'active' : ''}`}
                  >
                    Posts
                  </a>
                </div>
                <div className="">
                  {activeTab === 'overview' ? (
                    <Overview
                      user={auth.user}
                      profile={currentProfile}
                      setShowingBio={setShowingBio}
                      setShowingSkills={setShowingSkills}
                      setShowingEducation={setShowingEducation}
                      setShowingExperience={setShowingExperience}
                    />
                  ) : activeTab === 'statistics' ? (
                    statistics
                  ) : (
                    <ProfilePosts userId={match.params.id} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {isShowingBio && (
            <BioFormModal
              setShowingBio={setShowingBio}
              profile={currentProfile}
            />
          )}
          {isShowingSkills && (
            <SkillsFormModal
              setShowingSkills={setShowingSkills}
              profile={currentProfile}
            />
          )}
          {isShowingHeader && (
            <HeaderFormModal
              setShowingHeader={setShowingHeader}
              profile={currentProfile}
            />
          )}
          {isShowingEducation && (
            <EducationFormModal
              setShowingEducation={setShowingEducation}
              profile={currentProfile}
            />
          )}
          {isShowingExperience && (
            <ExperienceFormModal
              setShowingExperience={setShowingExperience}
              profile={currentProfile}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPostsByUser: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getPostsByCurrentUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPostsByUser,
  getProfileById,
  getPostsByCurrentUser,
  getCurrentProfile,
})(Profile);

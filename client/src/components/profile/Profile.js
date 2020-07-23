import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
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
import Graph from './Graph';
import 'frappe-charts/dist/frappe-charts.min.css';

const Profile = ({
  match,
  getProfileById,
  getCurrentProfile,
  getPostsByCurrentUser,
  getPostsByUser,
  profile,
  auth,
  post: { postsByUser, loading },
}) => {
  useEffect(() => {
    if (match.params.id === 'me') {
      getPostsByCurrentUser();
      getCurrentProfile();
    } else {
      getPostsByUser(match.params.id);
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
  const id = match.params.id;

  const [graphProperty, setGraphProperty] = useState({
    data: {
      dataPoints: {
        '1451606400': 2, 
        '1454284800': 10,
        '1595347200': 12
      }, // object with timestamp-value pairs
        start: new Date(new Date().setMonth(new Date().getMonth() - 12)),
        end: new Date()      // Date objects
      },
      countLabel: 'Level',
      discreteDomains: 0,  // default: 1
      colors: ['#ebedf0', '#e8c4ba', '#d88f7d', '#c95b40', '#b82601']
  })
  
const statistics = <Graph 
  title="Contribution Graph"
  type="heatmap"
  data={ graphProperty.data }
  countLabel= { graphProperty.countLabel }
  discreteDomains = { graphProperty.discreteDomains }
  colors= { graphProperty.colors }
  onSelect={a => console.log(a.index)}>
</Graph>

  return (
    <Fragment>
      {!currentProfile ||
      profileLoading ||
      loading ||
      !postsByUser ||
      !auth.user ||
      auth.loading ||
      (id != 'me' && id != currentProfile.user) ||
      (id == 'me' && auth.user && auth.user._id != currentProfile.user) ? (
        <div className="ui active centered loader">{profile.user}</div>
      ) : (
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
                    <div className="ui segment">
                    {statistics}
                    </div>
                  ) : (
                    <ProfilePosts postsByUser={postsByUser} />
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

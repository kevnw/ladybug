import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation, deleteExperience } from '../../actions/profile';
import ExperienceItem from './ExperienceItem';
import EducationItem from './EducationItem';

const Overview = ({
  user,
  profile,
  setShowingBio,
  setShowingSkills,
  setShowingEducation,
  setShowingExperience,
}) => {
  return (
    <div>
      {(profile.bio || user._id === profile.user) && (
        <div className="ui segment">
          <h2>
            {` Bio `}
            {user._id === profile.user && (
              <button
                onClick={() => setShowingBio(true)}
                className="invisible-button"
              >
                <i className="ui tiny icon edit"></i>
              </button>
            )}
          </h2>
          {profile.bio ? (
            <p>{`${profile.bio}`}</p>
          ) : (
            <div>You have not set up a bio</div>
          )}
        </div>
      )}
      {((profile.skills && profile.skills.length > 0) ||
        user._id === profile.user) && (
        <div className="ui segment">
          <h2>
            {`Skill Set `}
            {user._id === profile.user && (
              <button
                onClick={() => setShowingSkills(true)}
                className="invisible-button"
              >
                <i className="ui tiny icon edit"></i>
              </button>
            )}
          </h2>
          {profile.skills && profile.skills.length > 0 ? (
            <div className="icons">
              {profile.skills.map((skill, index) => (
                <div key={index}>
                  <i className="check icon"></i> {`${skill}`}
                </div>
              ))}
            </div>
          ) : (
            <div>You have not added any skill set</div>
          )}
        </div>
      )}
      <div className="ui stackable grid">
        <div className="eight wide stretched column">
          <div className="ui segment">
            <h2 className="red-text">
              {`Experience `}
              {user._id === profile.user && (
                <button
                  onClick={() => setShowingExperience(true)}
                  className="invisible-button"
                >
                  <i className="ui tiny icon red-text plus square outline"></i>
                </button>
              )}
            </h2>
            {profile.experiences && profile.experiences.length > 0 ? (
              <Fragment>
                {profile.experiences.map((experience) => (
                  <ExperienceItem
                    key={experience._id}
                    experience={experience}
                    user={user}
                    profile={profile}
                  />
                ))}
              </Fragment>
            ) : (
              <div>No experience record</div>
            )}
          </div>
        </div>
        <div className="eight wide stretched column">
          <div className="ui segment">
            <h2 className="red-text">
              {`Education `}
              {user._id === profile.user && (
                <button
                  onClick={() => setShowingEducation(true)}
                  className="invisible-button"
                >
                  <i className="ui tiny icon red-text plus square outline"></i>
                </button>
              )}
            </h2>
            {profile.educations && profile.educations.length > 0 ? (
              <Fragment>
                {profile.educations.map((education) => (
                  <EducationItem
                    key={education._id}
                    education={education}
                    user={user}
                    profile={profile}
                  />
                ))}
              </Fragment>
            ) : (
              <div>No education record</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation, deleteExperience })(Overview);

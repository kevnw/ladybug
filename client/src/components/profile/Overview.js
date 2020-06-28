import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation, deleteExperience } from '../../actions/profile';

const Overview = ({
  user,
  profile,
  setShowingBio,
  setShowingSkills,
  setShowingEducation,
  setShowingExperience,
  deleteEducation,
  deleteExperience,
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
                  <div
                    key={experience._id}
                    className="ui segment"
                    style={{ border: 'none', boxShadow: 'none' }}
                  >
                    <h3>{`${experience.company}`}</h3>
                    {user._id === profile.user && (
                      <button
                        onClick={() => deleteExperience(experience._id)}
                        className="ui right floated icon small button"
                      >
                        <i className="ui icon trash"></i>
                      </button>
                    )}
                    <p>
                      <Moment format="DD/MM/YYYY">
                        {experience.startDate}
                      </Moment>{' '}
                      -{' '}
                      {experience.current ? (
                        ' Current'
                      ) : (
                        <Moment format="DD/MM/YYYY">
                          {experience.endDate}
                        </Moment>
                      )}
                    </p>
                    <p>
                      <strong>Position: </strong>
                      {`${experience.title}`}
                    </p>
                    {experience.description && (
                      <p>
                        <strong>Description: </strong>
                        {`${experience.description}`}
                      </p>
                    )}
                  </div>
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
                  <div
                    key={education._id}
                    className="ui segment"
                    style={{ border: 'none', boxShadow: 'none' }}
                  >
                    <h3>{`${education.school}`}</h3>
                    {user._id === profile.user && (
                      <button
                        onClick={() => deleteEducation(education._id)}
                        className="ui right floated icon small button"
                      >
                        <i className="ui icon trash"></i>
                      </button>
                    )}
                    <p>
                      <Moment format="DD/MM/YYYY">{education.startDate}</Moment>{' '}
                      -{' '}
                      {education.current ? (
                        ' Current'
                      ) : (
                        <Moment format="DD/MM/YYYY">{education.endDate}</Moment>
                      )}
                    </p>
                    <p>
                      <strong>Degree: </strong>
                      {`${education.degree}`}
                    </p>
                    <p>
                      <strong>Field of Study: </strong>
                      {`${education.fieldOfStudy}`}
                    </p>
                    {education.description && (
                      <p>
                        <strong>Description: </strong>
                        {`${education.description}`}
                      </p>
                    )}
                  </div>
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

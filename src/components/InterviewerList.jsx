import React from 'react';
// import "components/InterviewerListItem.scss";
// import classNames from "classnames";
import PropTypes from 'prop-types'

import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';

function InterviewerList(props) {
  const parseInterviewerItems = props.interviewers.map((interviewer) => {
    return(
    <InterviewerListItem
    key={interviewer.id}
    {...interviewer}
    selected={interviewer.id === props.value}
    onChange={() => props.onChange(interviewer.id)}/>
    )
  })
  
  // const InterviewerItems = classnames("interviewers")
  
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parseInterviewerItems}</ul>
    </section>
  )
}

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  export default InterviewerList;
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
    const { interviewers, onChange, value } = props;

    //itterates over interviewers to create indivudual interviwers whom can be clicked to select their value 
    const interviewerList = interviewers.map(interviewer =>
        <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={value === interviewer.id}
            setInterviewer={() => onChange(interviewer.id)}
        />
    )
    return (
        <section className='interviewers'>
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{interviewerList}</ul>
        </section>
    );
}

// InterviewerList.propTypes = {
//     interviewers: PropTypes.array.isRequired
// };
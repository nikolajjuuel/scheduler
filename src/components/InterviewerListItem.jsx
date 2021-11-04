import React from "react";
import classNames from "classnames";
import "components/InterviewListItem.scss";

export default function InterviewListItem(props) {
    const {selected, setInterviewer, value, avatar, name} = props
    const interviewClass = classNames('interviewers__item', {
        "interviewers__item--selected": selected
    });

    return (
        <li onClick={ () => setInterviewer(value) }
            className="interviewers__item" className={interviewClass}>
            <img
                className="interviewers__item-image"
                src={avatar}
                alt={name}
            />
            {selected && name}
        </li>
    );
}

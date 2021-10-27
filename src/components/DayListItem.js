import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
    let dayClass = classNames("day-list__item", {
        "day-list__item--selected": props.selected
    });

    let numSpots = `${props.spots} spots remaining`;

    if (props.spots === 0) {
        numSpots = `no spots remaining`;
        dayClass = 'day-list__item day-list__item--full';
    }

    if (props.spots === 1) {
        numSpots = `1 spot remaining`
    }

    return (
        <li onClick={() => props.setDay(props.name)} className={dayClass}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{numSpots}</h3>
        </li>
    );
}
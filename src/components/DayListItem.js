import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

//sets styling class and changes Weekdays wording depending on number of spots remaining

export default function DayListItem(props) {
    const { selected, spots, setDay, name } = props;
    let dayClass = classNames("day-list__item", {
        "day-list__item--selected": selected
    });

    let numSpots = `${spots} spots remaining`;

    if (spots === 0) {
        numSpots = `no spots remaining`;
        dayClass = 'day-list__item day-list__item--full';
    }

    if (spots === 1) {
        numSpots = `1 spot remaining`
    }

    return (
        <li onClick={() => setDay(name)} className={dayClass}>
            <h2 className="text--regular">{name}</h2>
            <h3 className="text--light">{numSpots}</h3>
        </li>
    );
}
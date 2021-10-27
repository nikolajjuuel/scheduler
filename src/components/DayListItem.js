import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
    //   console.log(props)
    const dayClass = classNames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.full
    });

    const numSpots = props.spots;
    let spots = `${numSpots} spots remaining`;

    if (numSpots === 0) {
        spots = `no spots remaining`;
    }

    if (numSpots === 1) {
        spots = `1 spot remaining`
    }



    return (
        <li onClick={() => props.setDay(props.name)} className={dayClass}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{spots}</h3>
        </li>
    );
}
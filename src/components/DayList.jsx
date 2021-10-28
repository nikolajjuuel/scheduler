import React from "react";
import DayListItem from "./DayListItem";
import "components/DayListItem.scss";

export default function DayList(props) {
    const dayList = props.days.map((day) =>
        <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.value}
            setDay={props.onChange}
        />
    )

    return (
        <ul>
            {dayList}
        </ul>
    );
}
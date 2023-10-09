import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayItems = props.days.map((day, index) => {
    return (
      <DayListItem
        key={index}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{dayItems}</ul>;
}
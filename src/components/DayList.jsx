import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const parsedDayItems = props.days.map((dayItem) => (
    <DayListItem
      key={dayItem.id}
      {...dayItem}
      selected={props.value === dayItem.name}
      onChange={props.onChange}
    />
  ));

  return <ul>{parsedDayItems}</ul>;
}

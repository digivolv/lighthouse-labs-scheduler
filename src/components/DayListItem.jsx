import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  let isFull = props.spots === 0;
  const dayListItemClass = classNames(
    "day-list__item",
    { "day-list__item--full": isFull },
    { "day-list__item--selected": props.selected }
  );

  const FormatSpots = () => {
    if (props.spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>;
    } else if (props.spots === 1) {
      return <h3 className="text--light">1 spot remaining</h3>;
    } else {
      return <h3 className="text--light">{props.spots} spots remaining</h3>;
    }
  };

  return (
    <li className={dayListItemClass} onClick={() => props.onChange(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <FormatSpots />
    </li>
  );
}

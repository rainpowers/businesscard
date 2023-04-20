import React from "react";
import "./styles/BusinessCard.css";

export default function TextBox(props) {
  return (
    <div
      className="text-box"
      contentEditable="true"
      onInput={props.onTextChange}
      suppressContentEditableWarning={true}
    >
      {props.text}
    </div>
  );
}

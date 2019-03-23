import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mark } from "slate";

export function Toolbar({ children }) {
  return <div className="toolbar">{children}</div>;
}

export function Button({ onClick, icon }) {
  return (
    <button className="toolbar-button" onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="2x" />
    </button>
  );
}

export function Nodes({ attributes, children, node }, next) {
  switch (node.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return next();
  }
}

export function Marks({ attributes, children, mark }, next) {
  switch (mark.type) {
    case "bold":
      return <strong {...attributes}>{children}</strong>;
    case "italic":
      return <em {...attributes}>{children}</em>;
    case "underlined":
      return <u {...attributes}>{children}</u>;
    default:
      return next();
  }
}

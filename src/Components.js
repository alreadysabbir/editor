import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mark } from 'slate';
import { confirmDownload } from './utils';

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

export function FileNode({ src, name, size, type }) {
  const icon = type === 'application/pdf' ? 'file-pdf' : 'file';
  return (
    <a download={name} href={src} onClick={confirmDownload}>
      <FontAwesomeIcon icon={icon} size="2x" /> {name} ({size})
    </a>
  );
}

import React, { Component } from 'react';
import { Editor, getEventRange } from 'slate-react';
import { Value } from 'slate';
import { hot } from 'react-hot-loader';

import {
  getLocalContents,
  saveToLocal,
  isDocumentEdited,
  insertImage,
  fileUploader,
  filesInsert,
  imageFilesInsert,
  wrapLink,
  unwrapLink
} from './utils';
import { Toolbar, Button, FileNode } from './Components';
import initialContents from './initialContents.json';
import schema from './schema';
import plugins from './plugins';
import './App.css';
require('./icons');

const savedContents = getLocalContents();
const DEFAULT_NODE = 'paragraph';

function FNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

class App extends Component {
  constructor() {
    super();
    this.inputImageFile = React.createRef();
    this.inputFile = React.createRef();
  }

  state = {
    value: Value.fromJSON(savedContents || initialContents)
  };
  onRedo = event => {
    event.preventDefault();
    this.editor.redo();
  };
  onUndo = event => {
    event.preventDefault();
    this.editor.undo();
  };
  onLink = event => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const hasLinks = this.hasLinks();

    if (hasLinks) {
      editor.command(unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt('Enter the URL of the link:');

      if (href == null) {
        return;
      }

      editor.command(wrapLink, href);
    } else {
      const href = window.prompt('Enter the URL of the link:');

      if (href == null) {
        return;
      }

      const text = window.prompt('Enter the text for the link:');

      if (text == null) {
        return;
      }

      editor
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(wrapLink, href);
    }
  };
  onImage = event => {
    event.preventDefault();
    const src = window.prompt('Enter the URL of the image:');
    if (!src) return;
    this.editor.command(insertImage, src);
  };
  onChange = ({ value }) => {
    if (isDocumentEdited(this.state, value)) {
      saveToLocal(value);
    }
    this.setState({ value });
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onOpenImage = event => {
    this.inputImageFile.current.click();
  };
  onOpenFile = event => {
    this.inputFile.current.click();
  };

  onImageFileSelect = event => {
    fileUploader(event, this.editor, imageFilesInsert);
  };

  onFileSelect = event => {
    fileUploader(event, this.editor, filesInsert);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };
  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type === 'link');
  };

  ref = editor => {
    this.editor = editor;
  };

  render() {
    return (
      <div className="appcontainer">
        {this.renderToolbar()}
        <div className="editor">
          <Editor
            spellCheck
            autoFocus
            plugins={plugins}
            schema={schema}
            placeholder="Start typing..."
            value={this.state.value}
            onChange={this.onChange}
            renderNode={this.nodesRenderer}
            renderMark={this.renderMark}
            ref={this.ref}
          />
        </div>
      </div>
    );
  }

  renderToolbar = () => (
    <Toolbar>
      <Button icon="save" />
      <Button icon="undo" onClick={this.onUndo} />
      <Button icon="redo" onClick={this.onRedo} />
      {this.renderMarkButton('bold', 'bold')}
      {this.renderMarkButton('italic', 'italic')}
      {this.renderMarkButton('underlined', 'underline')}
      {this.renderBlockButton('block-quote', 'quote-right')}
      {this.renderBlockButton('numbered-list', 'list-ol')}
      {this.renderBlockButton('bulleted-list', 'list-ul')}
      <Button icon="images" onClick={this.onImage} />
      <Button icon="file-image" onClick={this.onOpenImage} />
      <Button icon="file-upload" onClick={this.onOpenFile} />
      <Button icon="link" onClick={this.onLink} />
      {this.inputRenderer()}
    </Toolbar>
  );

  inputRenderer = () => (
    <div>
      <input
        ref={this.inputImageFile}
        type="file"
        style={{ display: 'none' }}
        onChange={this.onImageFileSelect}
        accept="image/*"
      />
      <input
        ref={this.inputFile}
        type="file"
        style={{ display: 'none' }}
        onChange={this.onFileSelect}
        accept="application/pdf,text/plain"
      />
    </div>
  );
  nodesRenderer = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props;
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'image': {
        const src = node.data.get('src');
        return <img src={src} selected={isFocused} {...attributes} alt="" />;
      }
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        );
      }
      case 'file': {
        const data = node.data.toObject();

        return <FileNode {...data} />;
      }
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    return (
      <Button
        icon={icon}
        active={isActive}
        onClick={event => this.onClickMark(event, type)}
      />
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        icon={icon}
        active={isActive}
        onClick={event => this.onClickBlock(event, type)}
      />
    );
  };
}

export default (process.env.NODE_ENV === 'development'
  ? hot(module)(App)
  : App);

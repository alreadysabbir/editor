import React, { Component } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import { hot } from "react-hot-loader";
import { isKeyHotkey } from "is-hotkey";

import {
  getLocalContents,
  saveToLocal,
  isDocumentEdited,
  insertImage
} from "./utils";
import { Toolbar, Button } from "./Components";
import initialContents from "./initialContents.json";
import schema from "./schema";
import plugins from "./plugins";
import "./App.css";
require("./icons");

const savedContents = getLocalContents();
const DEFAULT_NODE = "paragraph";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isSaveHotkey = isKeyHotkey("mod+s");
const isUndoHotkey = isKeyHotkey("mod+z");

class App extends Component {
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
  onImage = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;
    this.editor.command(insertImage, src);
  };
  onChange = ({ value }) => {
    if (isDocumentEdited(this.state, value)) {
      saveToLocal(value);
    }
    this.setState({ value });
  };
  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
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

  ref = editor => {
    this.editor = editor;
  };

  render() {
    return (
      <div className="appcontainer">
        <Toolbar>
          <Button icon="save" />
          <Button icon="undo" onClick={this.onUndo} />
          <Button icon="redo" onClick={this.onRedo} />
          {this.renderMarkButton("bold", "bold")}
          {this.renderMarkButton("italic", "italic")}
          {this.renderMarkButton("underlined", "underline")}
          {this.renderBlockButton("block-quote", "quote-right")}
          {this.renderBlockButton("numbered-list", "list-ol")}
          {this.renderBlockButton("bulleted-list", "list-ul")}
          <Button icon="images" onClick={this.onImage} />
          <Button icon="link" />
          <Button icon="paperclip" />
        </Toolbar>
        <div className="editor">
          <Editor
            spellCheck
            autoFocus
            schema={schema}
            plugins={plugins}
            placeholder="Start typing..."
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.nodesRenderer}
            renderMark={this.renderMark}
            ref={this.ref}
          />
        </div>
      </div>
    );
  }

  nodesRenderer = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props;
    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "image": {
        const src = node.data.get("src");
        return <img src={src} selected={isFocused} {...attributes} alt="" />;
      }
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

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

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
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

export default (process.env.NODE_ENV === "development"
  ? hot(module)(App)
  : App);

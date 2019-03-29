import { Block } from 'slate';
import { getEventRange, getEventTransfer } from 'slate-react';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import filesize from 'filesize';

export function saveToLocal(value) {
  const editorContents = JSON.stringify(value.toJSON());
  localStorage.setItem('content', editorContents);
}

export function getLocalContents() {
  return JSON.parse(localStorage.getItem('content'));
}

export function isDocumentEdited(state, value) {
  return value.document !== state.value.document;
}

export function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor
    .insertBlock({
      type: 'image',
      data: { src }
    })
    .moveFocusToEndOfDocument();
}

export function insertFile(editor, data, target) {
  if (target) {
    editor.select(target);
  }
  console.log(editor);
  window.editor = editor;
  window.selectedFile = {
    type: 'file',
    data
  };
  editor
    .insertBlock({
      type: 'file',
      data
    })
    .moveFocusToEndOfDocument();
}

function getExtension(url) {
  return new URL(url).pathname.split('.').pop();
}

export function isImage(url) {
  return imageExtensions.includes(getExtension(url));
}

export function normalize(editor, { code, node, child }) {
  if (code === 'last_child_type_invalid') {
    const paragraph = Block.create('paragraph');
    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
  }
}

export function fileUploader(event, editor, inserter) {
  const target = getEventRange(event, editor);
  const { files } = event.target;
  inserter(files, editor, target);
}

export function imageFilesInsert(files, editor, target) {
  for (const file of files) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      editor.command(insertImage, reader.result, target);
    });
    reader.readAsDataURL(file);
  }
}
export function filesInsert(files, editor, target) {
  for (const file of files) {
    const reader = new FileReader();
    const data = {
      name: file.name,
      size: filesize(file.size, { round: 0 }),
      type: file.type
    };
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      data.src = reader.result;
      editor.command(insertFile, data, target);
    });
  }
}

export function dropOrPaste(event, editor, next) {
  const target = getEventRange(event, editor);
  if (!target && event.type === 'drop') return next();

  const transfer = getEventTransfer(event);
  const { type, text, files } = transfer;

  if (type === 'files') {
    imageFilesInsert(files, editor, target);
    return;
  }

  if (type === 'text') {
    if (!isUrl(text)) return next();
    if (!isImage(text)) return next();
    editor.command(insertImage, text, target);
    return;
  }

  next();
}

export function wrapLink(editor, href) {
  editor.wrapInline({
    type: 'link',
    data: { href }
  });

  editor.moveToEnd();
}

export function unwrapLink(editor) {
  editor.unwrapInline('link');
}

export function linkPaste(event, editor, next) {
  if (editor.value.selection.isCollapsed) return next();

  const transfer = getEventTransfer(event);
  const { type, text } = transfer;
  if (type !== 'text' && type !== 'html') return next();
  if (!isUrl(text)) return next();

  if (this.hasLinks()) {
    editor.command(unwrapLink);
  }

  editor.command(wrapLink, text);
}

export function confirmDownload(e) {
  // eslint-disable-next-line no-restricted-globals
  !confirm(`Download ${name}?`) && e.preventDefault();
}

export function onTab(editor) {
  const { document, startBlock } = editor.value;
  const listItem = document.getParent(startBlock.key);
  const depth = document.getDepth(listItem.key);
  if (!listItem) return;
  if (depth > 4) {
    return;
  }
  editor.increaseListItemDepth();
}

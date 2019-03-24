import InsertImages from 'slate-drop-or-paste-images';
import imageExtensions from 'image-extensions';
import { isKeyHotkey } from 'is-hotkey';
import { getEventRange, getEventTransfer } from 'slate-react';
import { insertImage, isImage } from './utils';
import isUrl from 'is-url';

function MarkHotkeys(options) {
  const isBoldHotkey = isKeyHotkey('mod+b');
  const isItalicHotkey = isKeyHotkey('mod+i');
  const isUnderlinedHotkey = isKeyHotkey('mod+u');
  return {
    onKeyDown(event, editor, next) {
      let mark;

      if (isBoldHotkey(event)) {
        mark = 'bold';
      } else if (isItalicHotkey(event)) {
        mark = 'italic';
      } else if (isUnderlinedHotkey(event)) {
        mark = 'underlined';
      } else {
        return next();
      }

      event.preventDefault();
      editor.toggleMark(mark);
    }
  };
}

function onDropOrPaste(event, editor, next) {
  const target = getEventRange(event, editor);
  if (!target && event.type === 'drop') return next();

  const transfer = getEventTransfer(event);
  const { type, text, files } = transfer;

  if (type === 'files') {
    for (const file of files) {
      const reader = new FileReader();
      const [mime] = file.type.split('/');
      if (mime !== 'image') continue;

      reader.addEventListener('load', () => {
        editor.command(insertImage, reader.result, target);
      });

      reader.readAsDataURL(file);
    }
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

function PasteOrDropImage(options) {
  return {
    onDrop: onDropOrPaste,
    onPaste: onDropOrPaste
  };
}

export default [MarkHotkeys(), PasteOrDropImage()];

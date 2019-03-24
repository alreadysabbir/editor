import { isKeyHotkey } from 'is-hotkey';
import { dropOrPaste, linkPaste } from './utils';

function MarkHotkeys(options) {
  const isBoldHotkey = isKeyHotkey('mod+b');
  const isItalicHotkey = isKeyHotkey('mod+i');
  const isUnderlinedHotkey = isKeyHotkey('mod+u');
  const isSaveHotkey = isKeyHotkey('mod+s');
  return {
    onKeyDown(event, editor, next) {
      let mark;

      if (isBoldHotkey(event)) {
        mark = 'bold';
      } else if (isItalicHotkey(event)) {
        mark = 'italic';
      } else if (isUnderlinedHotkey(event)) {
        mark = 'underlined';
      } else if (isSaveHotkey(event)) {
        event.preventDefault();
        return next();
      } else {
        return next();
      }

      event.preventDefault();
      editor.toggleMark(mark);
    }
  };
}

function PasteOrDropImage(options) {
  return {
    onDrop: dropOrPaste,
    onPaste: dropOrPaste
  };
}

function LinkPaste(options) {
  return {
    onPaste: linkPaste
  };
}

export default [MarkHotkeys(), LinkPaste(), PasteOrDropImage()];

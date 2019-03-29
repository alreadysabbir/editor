import { isKeyHotkey, isHotkey } from 'is-hotkey';
import { dropOrPaste, linkPaste, onTab } from './utils';
import Lists from '@convertkit/slate-lists';

function MarkHotkeys(options) {
  const isBoldHotkey = isKeyHotkey('mod+b');
  const isItalicHotkey = isKeyHotkey('mod+i');
  const isUnderlinedHotkey = isKeyHotkey('mod+u');
  const isSaveHotkey = isKeyHotkey('mod+s');
  const isTab = isHotkey('tab');

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
      } else if (isTab(event)) {
        event.preventDefault();
        return onTab(editor);
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

export default [
  MarkHotkeys(),
  LinkPaste(),
  PasteOrDropImage(),
  Lists({
    blocks: {
      ordered_list: 'ordered-list',
      unordered_list: 'unordered-list',
      list_item: 'list-item'
    },
    classNames: {
      ordered_list: 'ordered-list',
      unordered_list: 'unordered-list',
      list_item: 'list-item'
    }
  })
];

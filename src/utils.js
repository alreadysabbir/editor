import { Block } from "slate";

export function saveToLocal(value) {
  const editorContents = JSON.stringify(value.toJSON());
  localStorage.setItem("content", editorContents);
}

export function getLocalContents() {
  return JSON.parse(localStorage.getItem("content"));
}

export function isDocumentEdited(state, value) {
  return value.document !== state.value.document;
}

export function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src }
  });
}


export function normalize(editor, { code, node, child }) {
  if (code === "last_child_type_invalid") {
    const paragraph = Block.create("paragraph");
    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
  }
}

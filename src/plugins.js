import InsertImages from "slate-drop-or-paste-images";
import imageExtensions from "image-extensions";

export default [
  InsertImages({
    extensions: imageExtensions,
    insertImage: (change, file) => {
      return change.insertBlock({
        type: "image",
        isVoid: true,
        data: { file }
      });
    }
  })
];

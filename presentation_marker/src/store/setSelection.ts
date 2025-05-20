// import { EditorType, SelectionType } from "./EditorType.ts";

// function setSelection(
//   editor: EditorType,
//   newSelection: SelectionType
// ): EditorType {
//   return {
//     ...editor,
//     selection: newSelection,
//   };
// }

// export { setSelection };

import { EditorType, SelectionType } from "./EditorType";

function setSelection(
  editor: EditorType,
  selection: SelectionType
): EditorType {
  return {
    ...editor,
    selection,
  };
}

export { setSelection };

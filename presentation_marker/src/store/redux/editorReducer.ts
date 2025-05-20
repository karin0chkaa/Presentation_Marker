import { EditorType } from "../EditorType";
import { addSlide } from "../addSlide";
import { setSelection } from "../setSelection";
import { ActionType, EditorAction } from "./action";
import { defaultEditor } from "./defaultEditor";
import { removeSlide } from "../removeSlide";

function editorReducer(
  editor: EditorType = defaultEditor,
  action: EditorAction
): EditorType {
  switch (action.type) {
    case ActionType.ADD_SLIDE:
      return addSlide(editor);
    case ActionType.REMOVE_SLIDE:
      return removeSlide(editor);
    case ActionType.SET_SELECTION:
      return setSelection(editor, action.payload);
    case ActionType.SET_EDITOR:
      return action.payload;
    default:
      return editor;
  }
}

export { editorReducer };

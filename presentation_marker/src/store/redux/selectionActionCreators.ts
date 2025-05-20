import { SelectionType } from "../EditorType";
import { ActionType } from "./action";

function setSelection(newSelection: SelectionType) {
  return {
    type: ActionType.SET_SELECTION,
    payload: newSelection,
  };
}

export { setSelection };

import { EditorType, SelectionType } from "../EditorType";

enum ActionType {
  ADD_SLIDE = "addSlide",
  REMOVE_SLIDE = "removeSlide",

  SET_SELECTION = "setSelection",

  SET_EDITOR = "setEditor",
}

type AddSlideAction = {
  type: ActionType.ADD_SLIDE;
};

type RemoveSlideAction = {
  type: ActionType.REMOVE_SLIDE;
};

type SetSelectionAction = {
  type: ActionType.SET_SELECTION;
  payload: SelectionType;
};

type SetEditorAction = {
  type: ActionType.SET_EDITOR;
  payload: EditorType;
};

type EditorAction =
  | AddSlideAction
  | RemoveSlideAction
  | SetSelectionAction
  | SetEditorAction;

export { ActionType, type SetSelectionAction, type EditorAction };

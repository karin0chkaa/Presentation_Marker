// import { editor } from "./data.ts";

// //let _editor = editor;
// let _editor = JSON.parse(
//   localStorage.getItem("editorState") || JSON.stringify(editor)
// );
// let _handler: any = null;

// function getEditor() {
//   return _editor;
// }

// function setEditor(newEditor: any) {
//   _editor = newEditor;
//   localStorage.setItem("editorState", JSON.stringify(_editor));
//   console.log("Сохранено в localStorage: ", JSON.stringify(_editor));
// }

// function dispatch(modifyFn: Function, payload?: Object): void {
//   const newEditor = modifyFn(_editor, payload);
//   setEditor(newEditor);

//   if (_handler) {
//     _handler();
//   }
// }

// function addEditorChangeHandler(handler: Function) {
//   _handler = handler;
// }

// export { getEditor, setEditor, dispatch, addEditorChangeHandler };

import { editor } from "./data.ts";
import { validateDocument } from "./validation.ts";

let _editor = editor;
let _handler: any = null;

function getEditor() {
  return _editor;
}

function setEditor(newEditor: any) {
  if (validateDocument(newEditor)) {
    _editor = newEditor;
    // Сохраняем новое состояние в localStorage
    localStorage.setItem("presentationState", JSON.stringify(newEditor));
    console.log("Document is valid and saved successfully");
  } else {
    console.error("Invalid document structure");
  }
}

function dispatch(modifyFn: Function, payload?: Object): void {
  const newEditor = modifyFn(_editor, payload);
  setEditor(newEditor);

  if (_handler) {
    _handler();
  }
}

function addEditorChangeHandler(handler: Function) {
  _handler = handler;
}

//Функция для восстановления состояния из localStorage при загрузке страницы
function loadEditorFromLocalStorage() {
  const savedState = localStorage.getItem("presentationState");
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    if (validateDocument(parsedState)) {
      _editor = parsedState;
    } else {
      console.error("Loaded document is invalid");
    }
  }
}

export {
  getEditor,
  setEditor,
  dispatch,
  addEditorChangeHandler,
  loadEditorFromLocalStorage,
};

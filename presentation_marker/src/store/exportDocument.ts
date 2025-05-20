import { getEditor } from "./editor.ts";

export function exportDocument() {
  const editorState = getEditor();
  const blob = new Blob([JSON.stringify(editorState)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "presentation.json"; 
  link.click(); 
}

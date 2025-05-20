import { EditorType } from "./EditorType.ts";

function updateTextSize(
  editor: EditorType,
  payload: { id: string; width: number; height: number }
): EditorType {
  const { id, width, height } = payload;

  const updatedSlides = editor.presentation.slides.map((slide) => {
    const updatedElements = slide.elements!.map((element) => {
      if (element.id === id && element.type === "text") {
        return { ...element, width, height };
      }
      return element;
    });
    return { ...slide, elements: updatedElements };
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: updatedSlides,
    },
  };
}

export { updateTextSize };

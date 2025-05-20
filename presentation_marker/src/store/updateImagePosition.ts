import { EditorType } from "./EditorType.ts";

function updateImagePosition(
  editor: EditorType,
  payload: { id: string; x: number; y: number }
): EditorType {
  const { id, x, y } = payload;

  const updatedSlides = editor.presentation.slides.map((slide) => {
    const updatedElements = slide.elements!.map((element) => {
      if (element.id === id && element.type === "image") {
        return { ...element, x, y };
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

export { updateImagePosition };

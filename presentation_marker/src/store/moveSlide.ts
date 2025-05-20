import { EditorType } from "./EditorType";

function moveSlide(
  editor: EditorType,
  { fromIndex, toIndex }: { fromIndex: number; toIndex: number }
): EditorType {
  const slides = [...editor.presentation.slides]; // Копируем слайды
  const [movedSlide] = slides.splice(fromIndex, 1); // Убираем слайд из исходного места
  slides.splice(toIndex, 0, movedSlide); // Вставляем слайд в новое место

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides, 
    },
  };
}

export { moveSlide };

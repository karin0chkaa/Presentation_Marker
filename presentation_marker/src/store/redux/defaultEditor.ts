import { EditorType } from "../EditorType";
import { createNewSlide } from "./createNewSlide";

const slide = createNewSlide();
const defaultEditor: EditorType = {
  presentation: {
    id: "presentation-1",
    title: "Название презентации",
    slides: [slide],
    selection: {
      selectedSlideId: slide.id,
    },
  },
  selection: {
    selectedSlideId: slide.id,
  },
};

export { defaultEditor };

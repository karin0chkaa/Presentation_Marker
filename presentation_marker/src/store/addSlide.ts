import { EditorType } from "./EditorType";
import { Slide } from "./PresentationType";
import { uuidV4 } from "../utils/uuidV4";

function addSlide(NewPresentation: EditorType): EditorType {
  const newSlide: Slide = {
    id: uuidV4(),
    elements: [],
    background: {
      type: "solid",
      color: "#FFFFFF",
    },
  };
  const selectedSlideindex = NewPresentation.presentation.slides.findIndex(
    (SlideO) => SlideO.id == NewPresentation.selection?.selectedSlideId
  );
  return {
    presentation: {
      ...NewPresentation.presentation,
      slides: [
        ...NewPresentation.presentation.slides.slice(0, selectedSlideindex + 1),
        newSlide,
        ...NewPresentation.presentation.slides.slice(selectedSlideindex + 1),
      ],
    },
    selection: NewPresentation.selection,
  };
}

export { addSlide };

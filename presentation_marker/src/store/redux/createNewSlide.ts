import { v4 as uuidV4 } from "uuid";
import { Slide } from "../PresentationType";

function createNewSlide(): Slide {
  return {
    id: uuidV4(),
    elements: [],
    background: {
      type: "solid",
      color: "#ffffff",
    },
  };
}

export { createNewSlide };

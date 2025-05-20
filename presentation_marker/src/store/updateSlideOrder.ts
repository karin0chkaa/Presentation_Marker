import { Slide } from "./PresentationType.ts";
import { EditorType } from "./EditorType.ts";

export const updateSlidesOrder = (newSlidesOrder: Slide[]) => {
  return {
    type: "UPDATE_SLIDES_ORDER",
    payload: newSlidesOrder,
  };
};

export function slidesReducer(state: EditorType, action: any): EditorType {
  switch (action.type) {
    case "UPDATE_SLIDES_ORDER":
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: action.payload,
        },
      };
    default:
      return state;
  }
}

import { ActionType } from "./action";

function addSlide() {
  return {
    type: ActionType.ADD_SLIDE,
  };
}

function removeSlide() {
  return {
    type: ActionType.REMOVE_SLIDE,
  };
}

export { addSlide, removeSlide };

import { ActionType } from "./redux/action";
import { ImageItem } from "./PresentationType";

function addImage(src: string) {
  return {
    type: ActionType.ADD_IMAGE,
    payload: src,
  };
}

export { addImage };

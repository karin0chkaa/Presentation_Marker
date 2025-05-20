import { Presentation } from "./PresentationType.ts";

export type SelectionType = {
  selectedSlideId?: string;
};

export type EditorType = {
  presentation: Presentation;
  selection?: SelectionType | null;
};

export type Presentation = {
  id: string;
  title: string;
  slides: SlideCollection;
  selection: Select;
};

export type ElementItem = ImageItem | TextItem;

export type ImageItem = BaseSlideObject & {
  src: string;
  type: "image";
};

export type TextItem = BaseSlideObject & {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
};

export type Slide = {
  id: string;
  background: Background;
  elements?: ElementItem[];
  selection?: Select;
};

export type SlideCollection = Slide[];

export type Select = {
  selectedSlideId: string;
};

export type Background = BackgroundSolid | BackgroundImage;

export type BackgroundSolid = {
  type: "solid";
  color: string;
};

export type BackgroundImage = {
  type: "image";
  src: string;
};

export type BaseSlideObject = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

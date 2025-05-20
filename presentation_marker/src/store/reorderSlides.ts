function reorderSlides(editor: any, payload: { fromIndex: number; toIndex: number }): any {
    const { fromIndex, toIndex } = payload;
    const slides = [...editor.presentation.slides];
    
    const [movedSlide] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, movedSlide);
  
    return {
      ...editor,
      presentation: {
        ...editor.presentation,
        slides,
      },
    };
  }
  
  export { reorderSlides };
  
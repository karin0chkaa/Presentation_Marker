import {EditorType} from "./EditorType.ts";
import {Background} from "./PresentationType.ts";

function changeSlideBackground(editor: EditorType, newBackground: Background): EditorType {
    if (!editor.selection) {
        return editor;
    }

    const slideId = editor.selection.selectedSlideId;
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === slideId);

    if (slideIndex === -1) {
        return editor;
    }

    const slide = editor.presentation.slides[slideIndex];

    const updatedSlide = {
        ...slide,
        background: newBackground
    };

    const updatedSlides = [
        ...editor.presentation.slides.slice(0, slideIndex),
        updatedSlide,
        ...editor.presentation.slides.slice(slideIndex + 1)
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    }
}

export {
    changeSlideBackground
}
import {EditorType} from "./EditorType.ts";
import {TextItem} from "./PresentationType.ts";

function addText(editor: EditorType): EditorType {
    const currSlideId = editor.selection?.selectedSlideId;
    const currSlide = editor.presentation.slides.find(slide => slide.id === currSlideId);

    if (!currSlide) {
        return editor;
    }

    const newTextItem: TextItem = {
        id: `text${currSlide.elements!.length + 1}`,
        type: "text",
        text: "Test text",
        fontFamily: 'Arial',
        fontSize: 50,
        color: '#000000',
        x: 15,
        y: 20,
        width: 1000,
        height: 20,
    };

    const updatedElements = [...currSlide.elements!, newTextItem];
    const updatedSlide = {...currSlide, elements: updatedElements};

    const updatedSlides = editor.presentation.slides.map(slide => slide.id === currSlideId ? updatedSlide : slide);
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    }
}

export {
    addText
}
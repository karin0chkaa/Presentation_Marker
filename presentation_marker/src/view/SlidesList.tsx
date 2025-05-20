import { Slide } from '../store/PresentationType.ts';
import { DisplaySlide } from './slide/Slide.tsx';
import styles from "./SlideList.module.css";
import { SelectionType } from '../store/EditorType.ts'
import { dispatch } from "../store/editor.ts";
import { setSelection } from "../store/setSelection.ts";
import { useState } from 'react';
import { reorderSlides } from '../store/reorderSlides.ts';

const SLIDE_PREVIEW_SCALE: number = 0.2

type SlidesListProps = {
    slides: Array<Slide>,
    selection?: SelectionType,
}

function SlidesList({ slides, selection }: SlidesListProps) {

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    function onDragStart(index: number) {
        setDraggedIndex(index);
    }

    function onDragOver(event: React.DragEvent<HTMLDivElement>, index: number) {
        event.preventDefault();
    }

    function onDrop(index: number) {
        if (draggedIndex !== null && draggedIndex !== index) {
            dispatch(reorderSlides, { fromIndex: draggedIndex, toIndex: index });
        }
        setDraggedIndex(null);
    }

    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedSlideId: slideId
        })
    }
    
    return (
        <main className={styles.slideList}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={styles.slideItem}
                    draggable
                    onDragStart={() => onDragStart(index)}
                    onDragOver={(event) => onDragOver(event, index)}
                    onDrop={() => onDrop(index)}
                    onClick={() => onSlideClick(slide.id)}
                >
                    <span className={styles.slideNumber}>{index + 1}</span>
                    <DisplaySlide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id === selection?.selectedSlideId}
                        className={styles.item}
                    />
                </div>
            ))}
        </main>
    );
}

export {
    SlidesList
}

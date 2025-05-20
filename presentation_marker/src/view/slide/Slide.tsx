import { Slide } from '../../store/PresentationType.ts';
import { TextObject } from './TextObject.tsx';
import { ImageObject } from './ImageObject.tsx';
import styles from "./Slide.module.css";
import { CSSProperties } from "react";

const SLIDE_WIDTH: number = 900;
const SLIDE_HEIGH = 500

type SlideProps = {
    slide: Slide,
    scale?: number,
    isSelected: boolean,
    className: string,
}

function DisplaySlide({ slide, scale = 1, isSelected, className }: SlideProps) {
    const slideStyles: CSSProperties = {
        backgroundImage: slide.background.type === "image" ? `url(${slide.background.src})` : undefined,
        backgroundColor: slide.background.type === "solid" ? slide.background.color : undefined,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGH * scale}px`,
    }
    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }
    return (
        <section style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.elements!.map(element => {
                console.log("Slide elements:", slide.elements);

                if (typeof element.type === "undefined") {
                    throw new Error(`Element missing type ${JSON.stringify(element)}`);
                }
                else {
                    console.log(`Element type: ${element.type}`);
                }

                switch (element.type) {
                    case "text":
                        return <TextObject key={element.id} textObject={element} scale={scale} slideWidth={SLIDE_WIDTH} slideHeight={SLIDE_HEIGH} />
                    case "image":
                        return <ImageObject key={element.id} imageObject={element} scale={scale} />
                    default:
                        throw new Error(`Unknown element type`);
                }
            })}
        </section>
    )
}

export {
    DisplaySlide
}

import { Slide } from "../store/PresentationType.ts";
import styles from './Workspace.module.css'
import { DisplaySlide } from "./slide/Slide.tsx";

type WorkspaceProps = {
    slide: Slide,
    className?: string,
    isSelected: boolean
}

function Workspace({ slide }: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            <DisplaySlide slide={slide} className={styles.slide} isSelected={true}></DisplaySlide>
        </div>
    )
}

export {
    Workspace
}
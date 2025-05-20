import { getEditor } from "../store/editor";
import { Workspace } from "./Workspace";

function MainScreen() {
    const editor = getEditor();
    const selectedSlideId = editor.selection?.selectedSlideId;
    const selectedSlide = editor.presentation.slides.find(
        (slide) => slide.id === selectedSlideId
    );

    return (
        <main style={{ flex: 1, display: 'flex', justifyContent: "center", alignItems: "center" }}>
            {selectedSlide ? (
                <Workspace slide={selectedSlide} isSelected={true} />
            ) : (
                <p style={{ fontSize: '1.5rem', color: '#666' }}>Выберите слайд</p>
            )}
        </main>
    );
}

export default MainScreen;
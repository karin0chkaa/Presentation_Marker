import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import styles from './App.module.css';
import { SlidesList } from './view/SlidesList.tsx';
import { TopPanel } from './view/topPanel/TopPanel.tsx';
import { EditorType } from "./store/EditorType.ts";
import MainScreen from './view/mainScreen.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect } from 'react';
import { loadEditorFromLocalStorage } from './store/editor.ts';

type AppProps = {
    editor: EditorType
}

function App({ editor }: AppProps) {

    useEffect(() => {
        loadEditorFromLocalStorage();
    }, []);

    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <TopPanel title={editor.presentation.title} />
                <div className={styles.container}>
                    <SlidesList slides={editor.presentation.slides} selection={editor.selection!}></SlidesList>
                    <MainScreen />
                </div>
            </DndProvider>
        </Provider>
    );
}

export default App;

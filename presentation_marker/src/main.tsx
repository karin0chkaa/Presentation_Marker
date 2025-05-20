import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { addEditorChangeHandler, getEditor } from "./store/editor.ts";


function render() {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App editor={getEditor()} />
        </StrictMode>,
    )
}



addEditorChangeHandler(render)
render()
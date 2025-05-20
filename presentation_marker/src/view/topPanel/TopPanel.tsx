import styles from './TopPanel.module.css';
import { Button } from '../../components/button/Button.tsx';
import { dispatch, getEditor } from "../../store/editor.ts";
import { removeSlide } from "../../store/removeSlide.ts";
import { addSlide } from "../../store/addSlide.ts";
import { addImage } from "../../store/addImage.ts";
import { addText } from "../../store/addText.ts";
import { removeText } from "../../store/removeText.ts";
import { removeImage } from "../../store/removeImage.ts";
import { changeSlideBackground } from "../../store/changeSlideBackground.ts";
import { Background } from "../../store/PresentationType.ts";
import { renamePresentationTitle } from '../../store/renamePresentationTitle.ts';
import React, { useState, useRef } from 'react';
import { setSelection } from '../../store/setSelection.ts';
import { exportDocument } from '../../store/exportDocument.ts';
import { importDocument } from '../../store/importDocument.ts';
import { useAppActions } from '../hooks/useAppActions.ts';

type TopPanelProps = {
    title: string,
}

function TopPanel({ title }: TopPanelProps) {

    const { addSlide, removeSlide } = useAppActions();

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const choiceColor = ["#ccd5ae", "#e9edc9", "#fefae0", "#faedcd", "#d4a373", "#606c38", "#283618",
        "#dda15e", "#bc6c25", "#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500",
        "#edede9", "#d6ccc2", "#f5ebe0", "#e3d5ca", "#d5bdaf", "#cdb4db", "#ffc8dd",
        "#ffafcc", "#bde0fe", "#a2d2ff", "#780000", "#c1121f", "#fdf0d5", "#669bbc",
        "#9e0059", "#d9d9d9", "#fff3b0", "#vf8ad9d", "#ffdab9", "#83c5be", "#006d77",
        "#d8f3dc", "#95d5b2", "#9a8c98", "#c9ada7", "#f2e9e4", "#80ed99", "#ffea00"
    ];

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const backgroundInputRef = useRef<HTMLInputElement | null>(null);
    const importFileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImportFile = () => {
        importFileInputRef.current?.click();
    };

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function onAddText() {
        dispatch(addText)
    }

    function onRemoveText() {
        dispatch(removeText)
    }

    function onRemoveImage() {
        dispatch(removeImage)
    }

    function onChangeBackgroundColor(color: string) {
        const newBackground: Background = { type: "solid", color };
        dispatch(changeSlideBackground, newBackground);
        closeModal();
    }

    function onChangeBackgroundImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const src = reader.result as string;
                const newBackground: Background = { type: "image", src };
                dispatch(changeSlideBackground, newBackground);
            };
            reader.readAsDataURL(file);
        }
    }

    function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const src = reader.result as string;
                console.log("Image src: ", src);
                dispatch(addImage, src);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <section className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange} />
            <menu className={styles.buttonContainer}>
                <Button className={styles.button} text={"Добавить слайд"} onClick={addSlide} />
                <Button className={styles.button} text={"Удалить слайд"} onClick={removeSlide} />
                <Button className={styles.button} text={"Добаваить текст"} onClick={onAddText} />
                <Button className={styles.button} text={"Удалить текст"} onClick={onRemoveText} />
                <input
                    type="file"
                    accept='image/*'
                    onChange={onImageChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />
                <Button
                    className={styles.button}
                    text={"Добавить изображение"}
                    onClick={() => fileInputRef.current?.click()}
                />
                <Button className={styles.button} text={"Удалить изображение"} onClick={onRemoveImage} />
                <Button className={styles.button} text={"Фон"} onClick={openModal} />
                <Button className={styles.button} text='Скачать' onClick={exportDocument} />
                <Button className={styles.button} text='Импортировать' onClick={handleImportFile} />
                <input type="file" accept=".json" onChange={importDocument} style={{ display: "none" }} ref={importFileInputRef} />
            </menu>

            {isModalOpen && (
                <section className={styles.modal}>
                    <div className={styles.modalContent}>

                        <button className={styles.closeButton} onClick={closeModal}>✖</button>
                        <h3>Выберите тип фона</h3>
                        <h4>Цвет</h4>
                        <div className={styles.colorChoiceContainer}>
                            {choiceColor.map((color) => (
                                <button
                                    key={color}
                                    style={{ backgroundColor: color }}
                                    className={styles.colorButton}
                                    onClick={() => onChangeBackgroundColor(color)}
                                />
                            ))}
                        </div>

                        <h4>Изображение</h4>
                        <input
                            type="file"
                            accept='image/*'
                            onChange={onChangeBackgroundImage}
                            style={{ display: "none" }}
                            ref={backgroundInputRef}
                        />
                        <Button
                            className={styles.buttonImage}
                            text={"Выбрать изображение"}
                            onClick={() => backgroundInputRef.current?.click()}
                        />

                    </div>
                </section>
            )}

        </section>
    )
}

export {
    TopPanel
}
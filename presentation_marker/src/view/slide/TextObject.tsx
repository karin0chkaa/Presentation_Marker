import { TextItem } from '../../store/PresentationType.ts';
import { CSSProperties, useState, useRef, useEffect } from 'react';
import { dispatch } from '../../store/editor.ts';
import { updateTextPosition } from '../../store/updateTextPosition.ts';
import { updateTextSize } from '../../store/updateTextSize.ts';

type TextObjectProps = {
    textObject: TextItem;
    scale?: number;
    slideWidth: number;
    slideHeight: number;
};

function TextObject({ textObject, scale = 1, slideWidth, slideHeight }: TextObjectProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartY, setDragStartY] = useState(0);
    const [currentX, setCurrentX] = useState(textObject.x);
    const [currentY, setCurrentY] = useState(textObject.y);
    const [isResizing, setIsResizing] = useState(false);
    const [resizingPoint, setResizingPoint] = useState<string | null>(null);

    const textRef = useRef<HTMLDivElement>(null);

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${currentY * scale}px`,
        left: `${currentX * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        cursor: isResizing ? 'nwse-resize' : 'move',
        userSelect: 'none',
        border: isDragging || isResizing ? '1px solid blue' : '1px solid transparent',
        padding: '10px',
    };

    const contentStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        padding: '5px',
        fontSize: `${textObject.fontSize * scale}px`,
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        outline: isResizing ? '2px solid blue' : 'none',
    };

    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStartX(e.clientX - currentX * scale);
        setDragStartY(e.clientY - currentY * scale);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            let newX = (e.clientX - dragStartX) / scale;
            let newY = (e.clientY - dragStartY) / scale;

            // Ограничиваем перемещение границами слайда
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX + textObject.width > slideWidth) newX = slideWidth - textObject.width;
            if (newY + textObject.height > slideHeight) newY = slideHeight - textObject.height;

            setCurrentX(newX);
            setCurrentY(newY);
        }

        if (isResizing && resizingPoint) {
            let deltaX = e.clientX - dragStartX;
            let deltaY = e.clientY - dragStartY;
            let newWidth = textObject.width;
            let newHeight = textObject.height;
            let newX = currentX;
            let newY = currentY;

            switch (resizingPoint) {
                case 'top-left':
                    newWidth = textObject.width - deltaX;
                    newHeight = textObject.height - deltaY;
                    newX += deltaX;
                    newY += deltaY;
                    break;
                case 'top-right':
                    newWidth = textObject.width + deltaX;
                    newHeight = textObject.height - deltaY;
                    newY += deltaY;
                    break;
                case 'bottom-left':
                    newWidth = textObject.width - deltaX;
                    newHeight = textObject.height + deltaY;
                    newX += deltaX;
                    break;
                case 'bottom-right':
                    newWidth = textObject.width + deltaX;
                    newHeight = textObject.height + deltaY;
                    break;
                case 'top':
                    newHeight = textObject.height - deltaY;
                    newY += deltaY;
                    break;
                case 'bottom':
                    newHeight = textObject.height + deltaY;
                    break;
                case 'left':
                    newWidth = textObject.width - deltaX;
                    newX += deltaX;
                    break;
                case 'right':
                    newWidth = textObject.width + deltaX;
                    break;
            }

            // Ограничиваем минимальные размеры
            if (newWidth < 10) newWidth = 10;
            if (newHeight < 10) newHeight = 10;

            // Ограничиваем размеры и позицию границами слайда
            if (newX < 0) {
                newWidth += newX;
                newX = 0;
            }
            if (newY < 0) {
                newHeight += newY;
                newY = 0;
            }
            if (newX + newWidth > slideWidth) newWidth = slideWidth - newX;
            if (newY + newHeight > slideHeight) newHeight = slideHeight - newY;

            setCurrentX(newX);
            setCurrentY(newY);
            dispatch(updateTextSize, { id: textObject.id, width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            dispatch(updateTextPosition, { id: textObject.id, x: currentX, y: currentY });
            setIsDragging(false);
        }
        if (isResizing) {
            setIsResizing(false);
        }
    };

    const handleResizeStart = (e: React.MouseEvent, point: string) => {
        e.preventDefault();
        setIsResizing(true);
        setResizingPoint(point);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    const resizeHandleStyle: CSSProperties = {
        position: 'absolute',
        width: '6px',
        height: '6px',
        backgroundColor: 'blue',
        cursor: 'nwse-resize',
    };

    return (
        <div
            style={textObjectStyles}
            ref={textRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleMouseUp}
        >
            <div
                contentEditable
                suppressContentEditableWarning
                style={contentStyle}
            >
                {textObject.text}
            </div>

            {[
                { point: 'top-left', style: { top: 0, left: 0 } },
                { point: 'top-right', style: { top: 0, right: 0 } },
                { point: 'bottom-left', style: { bottom: 0, left: 0 } },
                { point: 'bottom-right', style: { bottom: 0, right: 0 } },
                { point: 'top', style: { top: 0, left: '50%' } },
                { point: 'bottom', style: { bottom: 0, left: '50%' } },
                { point: 'left', style: { top: '50%', left: 0 } },
                { point: 'right', style: { top: '50%', right: 0 } },
            ].map(({ point, style }) => (
                <div
                    key={point}
                    style={{ ...resizeHandleStyle, ...style }}
                    onMouseDown={(e) => handleResizeStart(e, point)}
                />
            ))}
        </div>
    );
}

export { TextObject };

import { ImageItem } from '../../store/PresentationType.ts';
import { CSSProperties, useState, useRef, useEffect } from 'react';
import { dispatch } from '../../store/editor.ts';
import { updateImagePosition } from '../../store/updateImagePosition.ts';
import { updateImageSize } from '../../store/updateImageSize.ts';

type ImageObjectProps = {
    imageObject: ImageItem;
    scale?: number;
};

function ImageObject({ imageObject, scale = 1 }: ImageObjectProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartY, setDragStartY] = useState(0);
    const [currentX, setCurrentX] = useState(imageObject.x);
    const [currentY, setCurrentY] = useState(imageObject.y);
    const [isResizing, setIsResizing] = useState(false);
    const [resizingPoint, setResizingPoint] = useState<string | null>(null);

    const imageRef = useRef<HTMLDivElement>(null);

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${currentY * scale}px`,
        left: `${currentX * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
        cursor: isResizing ? 'nwse-resize' : 'move',
        userSelect: 'none',
    };

    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStartX(e.clientX - currentX * scale);
        setDragStartY(e.clientY - currentY * scale);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newX = (e.clientX - dragStartX) / scale;
            const newY = (e.clientY - dragStartY) / scale;

            setCurrentX(newX);
            setCurrentY(newY);
        }

        if (isResizing && resizingPoint) {
            let deltaX = e.clientX - dragStartX;
            let deltaY = e.clientY - dragStartY;
            let newWidth = imageObject.width;
            let newHeight = imageObject.height;
            let newX = currentX;
            let newY = currentY;

            // Adjust the resize logic to correctly handle direction changes
            switch (resizingPoint) {
                case 'top-left':
                    newWidth = imageObject.width - deltaX;
                    newHeight = imageObject.height - deltaY;
                    newX = currentX + deltaX;
                    newY = currentY + deltaY;
                    break;
                case 'top-right':
                    newWidth = imageObject.width + deltaX;
                    newHeight = imageObject.height - deltaY;
                    newY = currentY + deltaY;
                    break;
                case 'bottom-left':
                    newWidth = imageObject.width - deltaX;
                    newHeight = imageObject.height + deltaY;
                    newX = currentX + deltaX;
                    break;
                case 'bottom-right':
                    newWidth = imageObject.width + deltaX;
                    newHeight = imageObject.height + deltaY;
                    break;
                case 'top':
                    newHeight = imageObject.height - deltaY;
                    newY = currentY + deltaY;
                    break;
                case 'bottom':
                    newHeight = imageObject.height + deltaY;
                    break;
                case 'left':
                    newWidth = imageObject.width - deltaX;
                    newX = currentX + deltaX;
                    break;
                case 'right':
                    newWidth = imageObject.width + deltaX;
                    break;
            }

            // Prevent resizing smaller than 10px
            if (newWidth < 10) newWidth = 10;
            if (newHeight < 10) newHeight = 10;

            dispatch(updateImageSize, { id: imageObject.id, width: newWidth, height: newHeight });
            dispatch(updateImagePosition, { id: imageObject.id, x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            dispatch(updateImagePosition, { id: imageObject.id, x: currentX, y: currentY });
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

    // Style for resize handles (squares)
    const resizeHandleStyle: CSSProperties = {
        position: 'absolute',
        width: '6px',
        height: '6px',
        backgroundColor: 'blue',
        cursor: 'nwse-resize',
    };

    return (
        <div
            style={imageObjectStyles}
            ref={imageRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleMouseUp}
        >
            <img src={imageObject.src} alt="Slide image" style={{ width: '100%', height: '100%' }} />

            {/* 8 resize handles as squares */}
            <div style={{ ...resizeHandleStyle, top: 0, left: 0 }} onMouseDown={(e) => handleResizeStart(e, 'top-left')} />
            <div style={{ ...resizeHandleStyle, top: 0, right: 0 }} onMouseDown={(e) => handleResizeStart(e, 'top-right')} />
            <div style={{ ...resizeHandleStyle, bottom: 0, left: 0 }} onMouseDown={(e) => handleResizeStart(e, 'bottom-left')} />
            <div style={{ ...resizeHandleStyle, bottom: 0, right: 0 }} onMouseDown={(e) => handleResizeStart(e, 'bottom-right')} />
            <div style={{ ...resizeHandleStyle, top: '50%', left: 0 }} onMouseDown={(e) => handleResizeStart(e, 'left')} />
            <div style={{ ...resizeHandleStyle, top: '50%', right: 0 }} onMouseDown={(e) => handleResizeStart(e, 'right')} />
            <div style={{ ...resizeHandleStyle, top: 0, left: '50%' }} onMouseDown={(e) => handleResizeStart(e, 'top')} />
            <div style={{ ...resizeHandleStyle, bottom: 0, left: '50%' }} onMouseDown={(e) => handleResizeStart(e, 'bottom')} />
        </div>
    );
}

export { ImageObject };
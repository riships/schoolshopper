import React, { useState, useCallback } from "react";
import deleteIcon from '../assets/images/delete-icon.svg';
import uploadIcon from '../assets/images/upload-icon.svg';

const SingleFileUpload = ({ customHeight, index, dispatch }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            dispatch({ type: "SET_FILE", index, file });
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        dispatch({ type: "SET_FILE", index, file: null });
    };

    return (
        <div
            className={`common-file-upload ${isDragging ? 'dragging' : ''}`} style={{ height: customHeight }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {preview ? (
                <div className="image-preview-wrapper">
                    <img className="selected-image" src={preview} alt="Selected" />
                    <button className="removeBtn d-none" onClick={handleRemoveImage}>
                        <img src={deleteIcon} alt="delete icon" /> <span>Remove</span>
                    </button>
                </div>
            ) : (
                <div className="file-upload-wrapper">
                    <img className="mb-2" src={uploadIcon} alt="upload icon" />
                    <p className="mb-0">Drag your image here, or <a href="#">click to browse</a></p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ opacity: 0, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, cursor: 'pointer' }}
                    />
                </div>
            )}
        </div>
    );
};

export default SingleFileUpload;

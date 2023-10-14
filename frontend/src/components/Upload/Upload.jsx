import axios from "axios";
import { useRef, useState } from "react";
import "./upload.css";

export default function Upload({ continueHandler }) {
    const [dragActive, setDragActive] = useState(false);
    const [description, setDescription] = useState("");
    const fileInput = useRef(null);

    // handle drag events
    function handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            fileInput.current.files = e.dataTransfer.files;
        }
        console.log(e.dataTransfer.files[0]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", fileInput.current.files[0]);
        console.log(formData);
        try {
            const response = await axios.post("api/uploadVideo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response);
            continueHandler(fileInput.current.files[0].name, description);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <form className="stage-section upload" onSubmit={handleSubmit}>
            <p className="helper-text">
                Генерируем обложку для видео. Загрузите видео, для которого будем генерировать
                обложку, и предоставьте текстовое описание/предпочтения для генерируемой обложки
            </p>
            <label
                htmlFor="images"
                className={`drop-container ${dragActive ? "drag-active" : ""}`}
                id="dropcontainer"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <span className="drop-title">Перетащите видео сюда</span>
                или
                <input ref={fileInput} type="file" id="video" accept="video/*" required />
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="upload-description"
                placeholder="Текстовое описание"
                name="description"
                id=""
                cols="60"
                rows="10"
                required
            ></textarea>
            <button className="btn">Продолжить</button>
        </form>
    );
}

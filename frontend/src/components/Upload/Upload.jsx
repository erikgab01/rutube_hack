import axios from "axios";
import { useRef, useState } from "react";
import "./upload.css";

export default function Upload({ continueHandler }) {
    const [putUserFace, setPutUserFace] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dragVideoActive, setDragVideoActive] = useState(false);
    const [dragImageActive, setDragImageActive] = useState(false);
    const [style, setStyle] = useState("Random Style");
    const [description, setDescription] = useState("");
    const videoInput = useRef(null);
    const imageInput = useRef(null);

    // handle drag events
    function handleDrag(e) {
        console.log(e.target.id);
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            if (e.target.id === "dropcontainer-video") setDragVideoActive(true);
            else {
                setDragImageActive(true);
            }
        } else if (e.type === "dragleave") {
            if (e.target.id === "dropcontainer-video") setDragVideoActive(false);
            else {
                setDragImageActive(false);
            }
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.id === "dropcontainer-video") {
            setDragVideoActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                videoInput.current.files = e.dataTransfer.files;
            }
        } else {
            setDragImageActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                imageInput.current.files = e.dataTransfer.files;
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const formDataVideo = new FormData();
        const formDataImage = new FormData();
        formDataVideo.append("file", videoInput.current.files[0]);
        try {
            const response1 = await axios.post("api/uploadVideo", formDataVideo, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (putUserFace) {
                formDataImage.append("file", imageInput.current.files[0]);
                const response2 = await axios.post("api/uploadImage", formDataImage, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            setIsLoading(false);
            continueHandler(
                videoInput.current.files[0].name,
                description,
                style,
                imageInput.current.files[0]?.name
            );
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
            <div className="fieldset-container">
                <fieldset>
                    <legend>Информация о видео</legend>
                    <label
                        className={`drop-container ${dragVideoActive ? "drag-active" : ""}`}
                        id="dropcontainer-video"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <span className="drop-title">Перетащите видео сюда</span>
                        или
                        <input ref={videoInput} type="file" id="video" accept="video/*" required />
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="upload-description"
                        placeholder="Текстовое описание"
                        name="description"
                        cols="60"
                        rows="10"
                        required
                    ></textarea>
                </fieldset>
                <fieldset>
                    <legend>Предпочтения пользователя</legend>
                    <select
                        className="select"
                        onChange={(e) => setStyle(e.target.value)}
                        value={style}
                    >
                        <option value="Random Style">Случайный стиль</option>
                        <option value="No Style">Без стиля</option>
                        <option value="Photograph">Фотография</option>
                        <option value="Modern Fashion">Современная мода</option>
                        <option value="Anime Style">Аниме</option>
                        <option value="Comic Strip">Комиксы</option>
                        <option value="Art Nouveau">Искусство модерн</option>
                    </select>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            defaultChecked={putUserFace}
                            onChange={() => setPutUserFace((old) => !old)}
                        />
                        Использовать лицо автора для генерации обложки
                    </label>
                    <label
                        hidden={!putUserFace}
                        className={`drop-container ${dragImageActive ? "drag-active" : ""}`}
                        id="dropcontainer-image"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <span className="drop-title">Перетащите фотографию сюда</span>
                        или
                        <input
                            ref={imageInput}
                            type="file"
                            id="image"
                            accept="image/*"
                            required={putUserFace}
                        />
                    </label>
                </fieldset>
            </div>
            <button disabled={isLoading} className="btn">
                Продолжить
            </button>
        </form>
    );
}

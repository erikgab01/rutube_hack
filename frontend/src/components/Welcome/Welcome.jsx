import "./welcome.css";
export default function Welcome({ selectHandler }) {
    return (
        <div className="stage-section welcome">
            <p className="helper-text">Что будем генерировать?</p>
            <div className="wrapper">
                <button onClick={() => selectHandler("video")} className="btn">
                    Обложка для видео
                </button>
                <button onClick={() => selectHandler("channel")} className="btn">
                    Обложка для канала
                </button>
                <button onClick={() => selectHandler("avatar")} className="btn">
                    Аватарка для канала
                </button>
            </div>
        </div>
    );
}

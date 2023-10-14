import "./loading.css";

export default function Loading() {
    return (
        <div className="stage-section loading">
            <p className="helper-text">Генерируем обложки, процесс может занять некоторое время</p>
            <span className="loader"></span>
        </div>
    );
}

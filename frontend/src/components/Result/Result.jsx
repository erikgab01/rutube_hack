export default function Result({ selectedImage, returnHandler, isSmallImage }) {
    return (
        <section className="stage-section choice">
            <img
                className={`responsive ${isSmallImage ? "small-img" : ""}`}
                src={`data:image/png;base64,${selectedImage}`}
            />
            <a
                className="btn btn-secondary"
                download="image.png"
                href={`data:image/png;base64,${selectedImage}`}
            >
                Скачать
            </a>
            <button onClick={returnHandler} className="btn">
                Вернуться в начало
            </button>
        </section>
    );
}

//<img width={200} src={`data:image/png;base64,${selectedImage}`} />

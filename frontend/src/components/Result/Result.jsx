export default function Result({ selectedImage, returnHandler }) {
    return (
        <section className="stage-section choice">
            <img width={200} src={`data:image/png;base64,${selectedImage}`} />
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

//<img width={200} key={i} src={`data:image/png;base64,${selectedImage}`}></img>

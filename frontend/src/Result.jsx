import { saveAs } from "file-saver";

export default function Result({ selectedImage, returnHandler }) {
    function downloadImage() {
        saveAs(selectedImage, "image.jpg");
    }
    return (
        <section className="stage-section choice">
            <img width={200} src={`data:image/png;base64,${selectedImage}`} />
            <button onClick={downloadImage} className="btn btn-secondary">
                Скачать
            </button>
            <button onClick={returnHandler} className="btn">
                Вернуться в начало
            </button>
        </section>
    );
}

//<img width={200} key={i} src={`data:image/png;base64,${selectedImage}`}></img>

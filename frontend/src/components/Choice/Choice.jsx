import Zoom from "react-medium-image-zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./zoom.css";
import "./choice.css";

export default function Choice({ generatedImages, continueHandler }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
    function handleImageSelect(image_index) {
        setSelectedImageIndex(image_index);
    }
    return (
        <section className="stage-section choice">
            <p className="helper-text">Выберете понравившуюся обложку из представленных ниже</p>
            <div className="images-grid">
                {generatedImages.map((image, i) => (
                    <div className="image-container" key={i}>
                        <Zoom>
                            <img
                                className={selectedImageIndex === i ? "selected" : ""}
                                width={250}
                                src={`data:image/png;base64,${image}`}
                            ></img>
                        </Zoom>
                        <button
                            onClick={() => handleImageSelect(i)}
                            className="btn select-image-btn"
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </div>
                ))}
            </div>
            <button
                disabled={selectedImageIndex === -1}
                onClick={() => continueHandler(selectedImageIndex)}
                className="btn"
            >
                Продолжить
            </button>
        </section>
    );
}

//<img width={200} key={i} src={`data:image/png;base64,${image}`}></img>

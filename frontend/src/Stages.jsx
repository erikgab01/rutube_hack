import { faCheck, faList, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stages({ currentStage }) {
    return (
        <>
            <ul className="stages">
                <li className={`stage upload ${currentStage >= 1 ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faUpload} size="2xl" />
                </li>
                <li className={`stage choice ${currentStage >= 2 ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faList} size="2xl" />
                </li>
                <li className={`stage result ${currentStage >= 3 ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faCheck} size="2xl" />
                </li>
            </ul>
        </>
    );
}

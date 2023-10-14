import Layout from "./Layout";
import Stages from "./Stages";
import Upload from "./Upload";
import Choice from "./Choice";
import { useState } from "react";
import axios from "axios";
import { images } from "./utils";

function App() {
    const [currentStage, setCurrentStage] = useState(2);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedVideoImageIndex, setSelectedVideoImageIndex] = useState(-1);

    async function handleGenerateRequest(name, description) {
        const response = await axios.post("api/generate", {
            name,
            description,
        });
        setGeneratedImages(response.data.images);
        setCurrentStage((old) => old + 1);
    }

    function handleImageChoice(chosenImageIndex) {
        setSelectedVideoImageIndex(chosenImageIndex);
        setCurrentStage((old) => old + 1);
    }

    let stageElement = null;
    switch (currentStage) {
        case 0:
            stageElement = null;
            break;
        case 1:
            stageElement = <Upload continueHandler={handleGenerateRequest} />;
            break;
        case 2:
            stageElement = <Choice generatedImages={images} continueHandler={handleImageChoice} />;
            break;
        case 3:
            stageElement = null;
            break;
        default:
            break;
    }
    return (
        <>
            <Layout>
                <Stages currentStage={currentStage} />
                <div className="container">{stageElement}</div>
            </Layout>
        </>
    );
}

export default App;

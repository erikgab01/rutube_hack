import { useState } from "react";
import axios from "axios";
import Layout from "./Layouts/Layout";
import Stages from "./components/Stages/Stages";
import Upload from "./components/Upload/Upload";
import Choice from "./components/Choice/Choice";
import Result from "./components/Result/Result";
import Loading from "./components/Loading/Loading";

function App() {
    const [currentStage, setCurrentStage] = useState(1);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

    const startingStage = 1;

    async function handleGenerateRequest(video_name, description, style, image_name) {
        setCurrentStage((old) => old + 1);
        if (!image_name) {
            image_name = "";
        }
        setTimeout(async () => {
            try {
                const response = await axios.post("api/generate", {
                    video_name,
                    description,
                    style,
                    image_name,
                });
                setGeneratedImages(response.data.images);
                setCurrentStage((old) => old + 1);
            } catch (e) {
                console.log(e);
                setCurrentStage((old) => old - 1);
            }
        }, 10000);
    }

    function handleImageChoice(chosenImageIndex) {
        setSelectedImageIndex(chosenImageIndex);
        setCurrentStage((old) => old + 1);
    }

    function handleReturn() {
        setCurrentStage(startingStage);
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
            stageElement = <Loading />;
            break;
        case 3:
            stageElement = (
                <Choice generatedImages={generatedImages} continueHandler={handleImageChoice} />
            );
            break;
        case 4:
            stageElement = (
                <Result
                    selectedImage={generatedImages[selectedImageIndex]}
                    returnHandler={handleReturn}
                />
            );
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

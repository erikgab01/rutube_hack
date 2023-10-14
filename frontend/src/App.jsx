import { useState } from "react";
import axios from "axios";
import Layout from "./Layouts/Layout";
import Stages from "./components/Stages/Stages";
import Upload from "./components/Upload/Upload";
import Choice from "./components/Choice/Choice";
import Result from "./components/Result/Result";
import Loading from "./components/Loading/Loading";
import Welcome from "./components/Welcome/Welcome";

function App() {
    const [currentStage, setCurrentStage] = useState(0);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

    const startingStage = 0;

    async function handleGenerateRequest(video_name, description, style, image_name) {
        setCurrentStage((old) => old + 1);
        if (!image_name) {
            image_name = "";
        }
        setTimeout(async () => {
            try {
                const response = await axios.post("api/generateVideoImages", {
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

    function handleSelectOption(option) {
        switch (option) {
            case "video":
                setCurrentStage(1);
                break;

            case "channel":
                handleChannelGeneration();
                break;

            case "avatar":
                handleAvatarGeneration();
                break;

            default:
                break;
        }
    }

    function handleChannelGeneration() {
        setCurrentStage(2);
        setTimeout(async () => {
            try {
                const response = await axios.post("api/generateChannelImage");
                setGeneratedImages([response.data.image]);
                setSelectedImageIndex(0);
                setCurrentStage(4);
            } catch (e) {
                console.log(e);
                setCurrentStage(0);
            }
        }, 10000);
    }

    function handleAvatarGeneration() {
        setCurrentStage(2);
        setTimeout(async () => {
            try {
                const response = await axios.post("api/generateAvatarImage");
                setGeneratedImages([response.data.image]);
                setSelectedImageIndex(0);
                setCurrentStage(4);
            } catch (e) {
                console.log(e);
                setCurrentStage(0);
            }
        }, 10000);
    }

    let stageElement = null;
    switch (currentStage) {
        case 0:
            stageElement = <Welcome selectHandler={handleSelectOption} />;
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

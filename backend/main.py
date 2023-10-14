from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import Model

class GeneratePayload(BaseModel):
    video_name: str = ""
    description: str = ""
    style: str = ""
    image_name: str = ""

MODEL = Model()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload file to ./videos directory
@app.post("/api/uploadVideo")
def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open(f"./data/videos/{file.filename}", 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()

    return {"message": f"Successfully uploaded {file.filename}"}

@app.post("/api/uploadImage")
def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open(f"./data/people/{file.filename}", 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()

    return {"message": f"Successfully uploaded {file.filename}"}

@app.post("/api/generateVideoImages")
async def generateVideoImage(payload: GeneratePayload):
    video_name = payload.video_name # Name of the video file
    description = payload.description # Text description, provided by the user
    style = payload.style
    image_name = payload.image_name
    print(video_name, description, style, image_name)

    # Get generated content from model somewhere here
    images = MODEL.generateVideoImages(video_name, description, style, image_name)

    return {
        "images": images
    }

@app.post("/api/generateChannelImage")
async def generateChannelImage():
    # Get generated content from model somewhere here
    image = MODEL.generateChannelImage()

    return {
        "image": image
    }

@app.post("/api/generateAvatarImage")
async def generateAvatarImage():
    # Get generated content from model somewhere here
    image = MODEL.generateAvatar()

    return {
        "image": image
    }

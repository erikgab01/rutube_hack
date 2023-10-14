from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import Model

class GeneratePayload(BaseModel):
    video_name: str = ""
    description: str = ""
    style: str = ""
    image_name: str = ""


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
        with open(f"./videos/{file.filename}", 'wb') as f:
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
        with open(f"./images/{file.filename}", 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()

    return {"message": f"Successfully uploaded {file.filename}"}

@app.post("/api/generate")
async def generate(payload: GeneratePayload):
    video_name = payload.video_name # Name of the video file
    description = payload.description # Text description, provided by the user
    style = payload.style
    image_name = payload.image_name
    print(video_name, description, style, image_name)

    # Get generated content from model somewhere here
    model = Model(video_name, description, style)
    images = model.generateImages()

    return {
        "images": images
    }
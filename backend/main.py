from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import Model

class GeneratePayload(BaseModel):
    name: str = ""
    description: str = ""

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

@app.post("/api/generate")
async def generate(payload: GeneratePayload):
    name = payload.name # Name of the video file
    description = payload.description # Text description, provided by the user

    # Get generated content from model somewhere here
    model = Model(name, description)
    images = model.generateImages()

    return {
        "images": images
    }
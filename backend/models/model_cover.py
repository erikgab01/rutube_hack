from diffusers import StableDiffusionImg2ImgPipeline, EulerDiscreteScheduler
from PIL import Image
import torch

import os

import numpy as np


MODEL_ID = "stabilityai/stable-diffusion-2"
SEED = 59

NEG_PROMPTS = [
    "blurry, dark photo, blue, nsfw content, text",
    "blurry, dark photo, blue, nsfw content, text",
    "blurry, dark photo, blue, nsfw content, text"
]

class ModelCover():
    def __init__(self, steps: int = 1000, scale: int = 9, num_images_per_prompt: int = 1):
        self.steps = steps
        self.scale = scale
        self.num_images_per_prompt = num_images_per_prompt

        self.pipe = None
        self.generator = None
        self._init_model()

    def _init_model(self):
        device = "cuda" if torch.cuda.is_available() else "cpu"
        try:
            scheduler = EulerDiscreteScheduler.from_pretrained(MODEL_ID, subfolder="scheduler")
            self.pipe = StableDiffusionImg2ImgPipeline.from_pretrained(MODEL_ID, scheduler=scheduler, torch_dtype=torch.float16)
        except:
            pass

        self.pipe = self.pipe.to(device)
        self.generator = torch.Generator(device=device).manual_seed(SEED)

    def get_images(self, images_path: str):
        init_images = []
        images = os.listdir(images_path)
        images_paths = [os.path.join(images_path, img) for img in images]
        images_paths_chosen = np.random.choice(images_paths, size=3, replace=False)

        init_images = [Image.open(image).convert("RGB").resize((800, 800)) for image in images_paths_chosen]
        return init_images

    def create_prompts(self, style: str, clear_desc: str):
        if style == 'No Style':
            prompt = f"High Quality Album Cover {clear_desc}"
        elif style == 'Random Style':
            prompt = f"High Quality Album Cover Modern Fashion {clear_desc}"
        else:
            prompt = f"High Quality Album Cover {style} {clear_desc}"
        return [prompt] * 3

    def generate(self, images_path: str, clear_desc: str, style: str):
        init_images = self.get_images(images_path)
        prompts = self.create_prompts(style, clear_desc)

        output = self.pipe(
            prompts,
            negative_prompt=NEG_PROMPTS,
            image=init_images,
            num_inference_steps=self.steps,
            guidance_scale=self.scale,
            num_images_per_prompt=self.num_images_per_prompt,
            generator=self.generator
        )

        if images_path is not None:
            self._save_images(output, images_path)

        return output.images

    def _save_images(output, images_path: str) -> None:
        for idx, image in enumerate(output.images):
            image_name = f'generated_images/{idx}.png'
            image_path = os.path.join(images_path, image_name)
            image.save(image_path)


if __name__ == '__main':
    model = ModelScript()

    IMAGES_PATH = "extracted_images/0/"

    model.get_images(IMAGES_PATH)
    model.generate()

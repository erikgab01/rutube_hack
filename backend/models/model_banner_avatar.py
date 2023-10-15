from diffusers import StableDiffusionPipeline
import torch


DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
# DEVICE = 'cpu'
STEPS = 100
SCALE = 9
SEED = 59


class BannerAvatarModel:
    def __init__(self):
        self.generator = torch.Generator(device=DEVICE).manual_seed(SEED)
        self.pipe = StableDiffusionPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5",
            torch_dtype=torch.float16
        ).to(DEVICE)

    def inference(self, desc_most_popular: str, mode: str = "banner"):
        if mode == "banner":
            prompt = [f"High Quality Banner {desc_most_popular}"]
            height = 880
            width = 2200
        elif mode == "avatar":
            prompt = [f"High Quality Icon {desc_most_popular}"]
            height = 800
            width = 800

        output = self.pipe(
            prompt,
            negative_prompt=["blurry, dark photo, blue, nsfw content, text"],
            height=height, width=width,
            num_inference_steps=STEPS,
            guidance_scale=SCALE,
            num_images_per_prompt=1,
            generator=self.generator
        )

        out_image = output.images[0]

        if mode == "banner":
            out_image = out_image.resize((2204, 876))

        return out_image

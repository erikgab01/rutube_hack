import base64
from io import BytesIO
import os

from models.model_banner_avatar import BannerAvatarModel
from models.model_cover import ModelCover
from utils.img_extractor import extract_images, insert_person
from utils.txt_preparator import TextPreparator


class Model():
    def __init__(self):
        self.model_ba = BannerAvatarModel()
        self.model_cv = ModelCover(steps=100)
        self.tp = TextPreparator()

    def generateVideoImages(self, file_name="", description="", style="", file_name_person=""):
        # Extract frames
        video_path = os.path.join("data/videos", file_name)
        img_path = f"data/extracted_images/{file_name.split('.')[0]}"
        extract_images(video_path, img_path)

        # Clear description
        clear_desc = self.tp.process_single_text(description)

        # Generate covers
        images = self.model_cv.generate(img_path, clear_desc, style)

        if file_name_person:
            images = self.insertPerson(file_name_person)

        b64_images = []
        for image in images:
            buffered = BytesIO()
            image.save(buffered, format="JPEG")
            encoded_string = base64.b64encode(buffered.getvalue())
            b64_images.append(encoded_string)
        return b64_images

    def generateChannelImage(self):
        # Get top words from all the collected descriptions
        top_words_in_desc = self.tp.get_top_eng_words("data/descriptions.txt")

        # Generate banner
        out_image = self.model_ba.inference(top_words_in_desc)

        # Encode to b64
        buffered = BytesIO()
        out_image.save(buffered, format="JPEG")
        b64_img = base64.b64encode(buffered.getvalue())
        return b64_img

    def generateAvatar(self):
        # Get top words from all the collected descriptions
        top_words_in_desc = self.tp.get_top_eng_words("data/descriptions.txt")

        # Generate banner
        out_image = self.model_ba.inference(top_words_in_desc, mode="avatar")

        # Encode to b64
        buffered = BytesIO()
        out_image.save(buffered, format="JPEG")
        b64_img = base64.b64encode(buffered.getvalue())
        return b64_img

    def insertPerson(self, file_name=""):
        imgs_with_people = insert_person(
            os.path.join("data/people", file_name),
            "generated_images"
        )

        return imgs_with_people

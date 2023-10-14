import base64

class Model():
    def __init__(self, file_name="", description="", style=""):
        self.file_name = file_name
        self.description = description
        self.style = style

    def generateVideoImages(self):
        images = []
        for i in range(1, 4):
            with open(f"generated_images/{i}.jpg", "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read())
                images.append(encoded_string)
        return images
    
    def generateChannelImage(self):
        image = ""
        with open("generated_images/1.jpg", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            image = encoded_string
        return image

    def generateAvatar(self):
        image = ""
        with open("generated_images/2.jpg", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            image = encoded_string
        return image

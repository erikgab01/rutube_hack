import cv2
import os
from PIL import Image
import numpy as np
from matplotlib import cm


def extract_images(video_path: str, images_path: str) -> None:
    os.makedirs(images_path, exist_ok=True)

    # Frame number
    count = 0

    # Read the video
    vidcap = cv2.VideoCapture(video_path)
    success, image = vidcap.read()
    success = True

    # Start converting the video
    print("Converting video..")
    while success:
        vidcap.set(cv2.CAP_PROP_POS_MSEC, (count*1000))
        success, image = vidcap.read()
        if success:
            cv2.imwrite(os.path.join(images_path, f"frame_{count}.jpg"), image)     # save frame as JPEG file
        count = count + 1

    print("Video is converted")
    print()


def insert_person(face_path: str = "data/bald_brazzers.jpg", gen_images_path: str = ""):
    face_arr = cv2.imread(face_path)
    face_arr = cv2.cvtColor(face_arr, cv2.COLOR_BGR2RGB)
    face_arr = cv2.resize(face_arr, (400, 400))

    covers_with_person = []
    for img_path in gen_images_path:
        img = cv2.imread(img_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (800, 800))

        for row in range(400):
            for col in range(400):
                for channel in range(3):
                    if face_arr[row][col][channel] <= 250:
                        img[400 + row, 200 + col, channel] = face_arr[row][col][channel]
        covers_with_person.append(Image.fromarray(np.uint8(cm.gist_earth(img)*255)))
    return covers_with_person


if __name__ == '__main__':
    VIDEO_NAME = "0.mp4"
    VIDEO_PATH = os.path.join("videos", VIDEO_NAME)
    IMAGES_PATH = os.path.join("extracted_images", VIDEO_NAME.split('.')[0])

    extract_images(VIDEO_PATH, IMAGES_PATH)

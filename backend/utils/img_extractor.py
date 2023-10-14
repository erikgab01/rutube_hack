import cv2
import os


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


if __name__ == '__main__':
    VIDEO_NAME = "0.mp4"
    VIDEO_PATH = os.path.join("videos", VIDEO_NAME)
    IMAGES_PATH = os.path.join("extracted_images", VIDEO_NAME.split('.')[0])

    extract_images(VIDEO_PATH, IMAGES_PATH)

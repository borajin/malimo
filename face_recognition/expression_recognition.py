from tensorflow.keras.preprocessing.image import img_to_array
import imutils
import cv2
from tensorflow.keras.models import load_model
import numpy as np
import sys
import time
import os

import json
from collections import OrderedDict

# parameters for loading data and images
detection_model_path = 'haarcascades/haarcascade_frontalface_default.xml'
emotion_model_path = 'models/_mini_XCEPTION.06-0.54.hdf5'

FRAME_PATH = './images/frame'

file_data = OrderedDict()

count = 0
max_count = 0
frame_num = 20

face_detection = cv2.CascadeClassifier(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)
EMOTIONS = ["angry","disgust","scared","happy","sad","surprised","neutral"]
RESULTS = {EMOTIONS[0]: 0, EMOTIONS[1]: 0, EMOTIONS[2]: 0, EMOTIONS[3]: 0, EMOTIONS[4]: 0, EMOTIONS[5]: 0, EMOTIONS[6]: 0}

video = cv2.VideoCapture('./test.mp4')

while(video.isOpened()):
    ret, image = video.read()

    if(ret == False):
        break
 
    if(int(video.get(1)) % 20 == 0):
        cv2.imwrite("./images/frame%d.jpg" % max_count, image)
        print(max_count)
        max_count += 1

while(count < max_count):
    frame = cv2.imread('./images/frame%d.jpg' % count, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detection.detectMultiScale(gray,scaleFactor=1.1,minNeighbors=5,minSize=(30,30),flags=cv2.CASCADE_SCALE_IMAGE)
    
    if len(faces) > 0:
        faces = sorted(faces, reverse=True,
        key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))[0]
        (fX, fY, fW, fH) = faces
        # Extract the ROI of the face from the grayscale image, resize it to a fixed 48x48 pixels, and then prepare
        # the ROI for classification via the CNN
        roi = gray[fY:fY + fH, fX:fX + fW]
        roi = cv2.resize(roi, (48, 48))
        roi = roi.astype("float") / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)

        preds = emotion_classifier.predict(roi)[0]

        for (i, (emotion, prob)) in enumerate(zip(EMOTIONS, preds)):
            RESULTS[emotion] = RESULTS[emotion] + int(prob*100)
    
    os.remove(FRAME_PATH + str(count) + '.jpg')
    count += 1

for k, v in RESULTS.items():
    file_data[k] = v/count

data = json.dumps(file_data, ensure_ascii=False, indent='\t')
count = 0
max_count = 0

print(data)
import moviepy.editor as mp
#-*- coding:utf-8 -*-
import urllib3
import json
import base64
import numpy as np
from pydub import AudioSegment
import scipy.io as sio
import scipy.io.wavfile

class SpeechToText():
    def __init__(self):
        clip = mp.VideoFileClip("./files/interview.webm")
        clip.audio.write_audiofile("./files/interview.wav")

        self.openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition"
        self.accessKey = "90ad2d31-62f8-49a8-908c-280f53aca4dc"
        self.audioFilePath = "./files/interview.wav"
        self.languageCode = "korean"

        #speech api 에 맞게 음성 파일 변환. (비트전송률 : 16000, 채널수 : 1)
        wav = AudioSegment.from_wav(self.audioFilePath)
        wav = wav.set_frame_rate(16000)
        wav = wav.set_channels(channels=1)
        wav.export(self.audioFilePath, format='wav')

        samplerate, data = sio.wavfile.read(self.audioFilePath)
        self.times = np.arange(len(data))/float(samplerate)

    def speech_to_text(self):
        #speech api (etri)
        file = open(self.audioFilePath, "rb")
        audioContents = base64.b64encode(file.read()).decode("utf8")
        file.close()
        
        requestJson = {
            "access_key": self.accessKey,
            "argument": {
                "language_code": self.languageCode,
                "audio": audioContents
            }
        }
        
        http = urllib3.PoolManager()
        response = http.request(
            "POST",
            self.openApiURL,
            headers={"Content-Type": "application/json; charset=UTF-8"},
            body=json.dumps(requestJson)
        )

        contents = str(response.data,"utf-8")

        return contents

    #분석
    def speech_analysis(self, contents):
        data = contents.split(' ')
        speed = len(contents) / self.times[-1]
        chu = {'에': 0, '음': 0, '저기': 0, '자':0}
        mak = {'무조건': 0, '잘은': 0, '모르겠지만': 0, '같습니다': 0, '열심히': 0, '아마도': 0}
        result = {'말속도': speed, '추임새': chu, '막연한표현': mak}

        for d in data:
            if(d == '자'):
                chu['자'] += 1
            if(d == '에'):
                chu['에'] += 1
            if(d == '음'):
                chu['음'] += 1
            if(d == '저기'):
                chu['저기'] += 1
            if(d == '무조건'):
                mak['무조건'] += 1
            if(d == '잘은'):
                mak['잘은'] += 1    
            if(d == '모르겠지만'):
                mak['모르겠지만'] += 1
            if(d == '같습니다'):
                mak['같습니다'] += 1
            if(d == '열심히'):
                mak['열심히'] += 1
            if(d == '아마도'):
                mak['아마도'] += 1

        return result
import speech_to_text as stt
import expression_recognition as recog

class MalimoAi():
    def result(self):
        s = stt.SpeechToText()
        e = recog.ExpressionRecog()

        script = s.speech_to_text()
        script_analysis = s.speech_analysis(script)
        expression = e.recog()

        print(script, script_analysis, expression)

if __name__ == '__main__':
    malimo_ai = MalimoAi()
    malimo_ai.result()
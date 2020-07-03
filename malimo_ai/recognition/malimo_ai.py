import speech_to_text
import expression_recognition

class MalimoAi():
    def ai(self):
        s = speech_to_text.SpeechToText()
        e = expression_recognition.ExpressionRecog()

        script = s.speech_to_text()
        script_analysis = s.speech_analysis(script)
        expression = e.recog()
        
        print(script, script_analysis, expression)
        
if __name__ == '__main__':
    malimo_ai = MalimoAi()
    malimo_ai.ai()
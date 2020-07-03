from flask import flask
import expression_recognition

app = Flask (__name__)

@app.route('/')
def hello_world():
    return 'Hello, World'

@app.route('/user/<userName>')
def hello_user(userName):
    return 'Hello, %s' % (userName)

@app.route('/recognition', methods = ['POST'])
def recognition():
    f = request.files['file']
    f.save('./files/interview.webm')
    r = expression_recognition.RECOG()
    return jsonify(r.recog(f))

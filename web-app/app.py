from flask import Flask, request, render_template, url_for
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg19 import VGG19, preprocess_input, decode_predictions
import numpy as np
import os

app = Flask(__name__)

# Load the pre-trained VGG-19 model
model = VGG19(weights='imagenet')

def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    preds = model.predict(x)
    return decode_predictions(preds, top=1)[0]

@app.route('/', methods=['GET', 'POST'])
def index():
    prediction = ""
    img_url = None  # Variable to store the URL-friendly image path
    if request.method == 'POST':
        f = request.files['image']
        basepath = os.path.dirname(__file__)
        img_dir = 'uploads'
        img_path = os.path.join(img_dir, f.filename)
        full_img_path = os.path.join(app.root_path, 'static', img_path)
        f.save(full_img_path)

        # Replace backslashes with forward slashes for web compatibility
        img_url = img_path.replace(os.sep, '/')

        preds = model_predict(full_img_path, model)
        prediction = preds[0][1]

    return render_template('index.html', prediction=prediction, img_url=img_url)

if __name__ == '__main__':
    app.run(debug=True)

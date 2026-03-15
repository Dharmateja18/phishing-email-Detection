import os
import joblib
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# -------------------------------
# Flask App Setup
# -------------------------------

app = Flask("phishdetect_ai")
CORS(app)

BASE_DIR = os.getcwd()

# -------------------------------
# Load Model and Vectorizer
# -------------------------------

MODEL_PATH = os.path.join(BASE_DIR, "models", "phishing_detector.pkl")


model = joblib.load(MODEL_PATH)


print("Model and vectorizer loaded successfully")

# -------------------------------
# Routes
# -------------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        email_text = data.get("email_text")

        if not email_text:
            return jsonify({"error": "No email text provided"}), 400

        # Convert text to features
       

        prediction = model.predict(email_text)[0]

        if prediction == 1:
            result = "Phishing Email"
        else:
            result = "Legitimate Email"

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# Health Check
# -------------------------------

@app.route("/health")
def health():
    return jsonify({"status": "running"})


# -------------------------------
# Run App
# -------------------------------


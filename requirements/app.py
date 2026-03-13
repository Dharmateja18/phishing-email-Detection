import sys
import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# --------------------------------------------------
# Fix project paths
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))

sys.path.insert(0, PROJECT_ROOT)

from src.predict import predict_email

# --------------------------------------------------
# Flask App Setup
# --------------------------------------------------

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "static")
)

CORS(app)

# --------------------------------------------------
# Website Routes
# --------------------------------------------------

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/predict")
def predict_page():
    return render_template("predict.html")


@app.route("/details")
def details_page():
    return render_template("details.html")


@app.route("/contact")
def contact_page():
    return render_template("contact.html")


# --------------------------------------------------
# API Route (Website + Chrome Extension)
# --------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def api_predict():

    try:

        data = request.get_json()

        email = data.get("email")

        if not email:
            return jsonify({
                "success": False,
                "error": "Email text is required"
            }), 400

        model_path = os.path.join(PROJECT_ROOT, "models", "phishing_detector.pkl")
        vectorizer_path = os.path.join(PROJECT_ROOT, "data", "preprocessed_data.pkl")

        result = predict_email(
            model_path,
            vectorizer_path,
            email
        )

        return jsonify({
            "success": True,
            "prediction": result["label"],
            "confidence": result["probability"]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# --------------------------------------------------
# Run App
# --------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)
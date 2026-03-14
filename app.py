import os
import sys
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# --------------------------------------------------
# Fix project paths
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = BASE_DIR

sys.path.append(PROJECT_ROOT)

# --------------------------------------------------
# Import prediction function
# --------------------------------------------------

try:
    sys.path.append(os.path.join(PROJECT_ROOT,"src"))
    from predict import predict_email
except Exception as e:
    print("Import error:", e)
    predict_email = None


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
# Model paths (loaded once)
# --------------------------------------------------

MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "phishing_detector.pkl")
VECTORIZER_PATH = os.path.join(PROJECT_ROOT, "data", "preprocessed_data.pkl")


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
# API Route
# --------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def api_predict():

    if predict_email is None:
        return jsonify({
            "success": False,
            "error": "Prediction module failed to load"
        }), 500

    try:

        data = request.get_json()

        email = data.get("email")

        if not email:
            return jsonify({
                "success": False,
                "error": "Email text is required"
            }), 400

        result = predict_email(
            MODEL_PATH,
            VECTORIZER_PATH,
            email
        )

        return jsonify({
            "success": True,
            "prediction": result["label"],
            "confidence": result["probability"]
        })

    except Exception as e:

        print("Prediction error:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# --------------------------------------------------
# Health Check Route (important for Render)
# --------------------------------------------------

@app.route("/health")
def health():
    return "Server running"


# --------------------------------------------------
# Ping route (optional keep-alive)
# --------------------------------------------------

@app.route("/ping")
def ping():
    return "OK"


# --------------------------------------------------
# Run App (for local testing only)
# --------------------------------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
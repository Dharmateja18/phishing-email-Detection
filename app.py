import os
import sys
import joblib
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# --------------------------------------------------
# Fix project paths
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = BASE_DIR

sys.path.append(PROJECT_ROOT)

# --------------------------------------------------
# Flask App Setup
# --------------------------------------------------

app = Flask(
    _name_,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "static")
)

CORS(app)

# --------------------------------------------------
# Load ML Model (load once for faster performance)
# --------------------------------------------------

MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "phishing_detector.pkl")

try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print("Model loading error:", e)
    model = None

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
# API Route (used by Chrome extension + website)
# --------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def api_predict():

    if model is None:
        return jsonify({
            "success": False,
            "error": "Model not loaded"
        }), 500

    try:

        data = request.get_json()

        email_text = data.get("email")

        if not email_text:
            return jsonify({
                "success": False,
                "error": "Email text is required"
            }), 400

        # ML prediction
        prediction = model.predict([email_text])[0]

        if hasattr(model, "predict_proba"):
            probability = float(model.predict_proba([email_text])[0][1])
        else:
            probability = 0.0

        label = "Phishing" if prediction == 1 else "Legitimate"

        return jsonify({
            "success": True,
            "prediction": label,
            "confidence": probability
        })

    except Exception as e:

        print("Prediction error:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# --------------------------------------------------
# Health Check Route (for Render monitoring)
# --------------------------------------------------

@app.route("/health")
def health():
    return jsonify({
        "status": "running"
    })

# --------------------------------------------------
# Run App (local testing)
# --------------------------------------------------

if _name_ == "_main_":

    port = int(os.environ.get("PORT", 10000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )
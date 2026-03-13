import sys
import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Add parent directory to path to resolve src module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.predict import predict_email

# Create Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

# Enable CORS for Chrome extension
CORS(app)

# -----------------------
# Website Routes
# -----------------------

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/predict')
def predict_page():
    return render_template('predict.html')


@app.route('/details')
def details_page():
    return render_template('details.html')


@app.route('/contact')
def contact_page():
    return render_template('contact.html')


# -----------------------
# API Route (for extension)
# -----------------------

@app.route('/api/predict', methods=['POST'])
def api_predict():

    try:
        data = request.get_json()

        email = data.get('email')

        if not email:
            return jsonify({
                "success": False,
                "error": "Email text is required"
            }), 400

        result = predict_email(
            "models/phishing_detector.pkl",
            "data/preprocessed_data.pkl",
            email
        )

        return jsonify({
            "success": True,
            "prediction": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# -----------------------
# Run App
# -----------------------

if __name__ == "__main__":
    app.run(debug=True)
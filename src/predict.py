import pickle
import re

def predict_email(model_file, vectorizer_file, email_text):

    try:

        # --------------------------------------------------
        # Rule-based URL detection (FIRST)
        # --------------------------------------------------

        suspicious_domains = [
            ".ru", ".xyz", ".top", ".click", ".gq", ".tk",
            "account-security", "verify-login", "secure-update"
        ]

        urls = re.findall(r'https?://[^\s]+', email_text)

        for url in urls:
            for domain in suspicious_domains:
                if domain in url:
                    return {
                        "label": "Phishing",
                        "probability": 1.0
                    }

        # --------------------------------------------------
        # Load ML model
        # --------------------------------------------------

        with open(model_file, "rb") as f:
            model = pickle.load(f)

        with open(vectorizer_file, "rb") as f:
            _, _, vectorizer = pickle.load(f)

        email_vector = vectorizer.transform([email_text]).toarray()

        probability = model.predict_proba(email_vector)[0][1]

        # --------------------------------------------------
        # Classification thresholds
        # --------------------------------------------------

        if probability >= 0.80:
            label = "Phishing"

        elif probability >= 0.50:
            label = "Suspicious"

        else:
            label = "Legitimate"

        return {
            "label": label,
            "probability": float(probability)
        }

    except Exception as e:

        return {
            "label": "Error",
            "probability": 0,
            "error": str(e)
        }
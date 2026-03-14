import pickle


def predict_email(model_file, vectorizer_file, email_text):

    try:
        # Load model
        with open(model_file, "rb") as f:
            model = pickle.load(f)

        # Load vectorizer
        with open(vectorizer_file, "rb") as f:
            _, _, vectorizer = pickle.load(f)

        # Convert email text to vector
        email_vector = vectorizer.transform([email_text]).toarray()

        # Predict probability
        probability = model.predict_proba(email_vector)[0][1]

        # Threshold for phishing
        threshold = 0.85

        if probability >= threshold:
            label = "Phishing"
        else:
            label = "Not Phishing"

        return {
            "label": label,
            "probability": float(probability)
        }

    except Exception as e:

        return {
            "label": "Error",
            "probability": 0.0,
            "error": str(e)
        }
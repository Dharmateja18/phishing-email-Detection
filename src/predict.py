import pickle

def predict_email(model_file, vectorizer_file, email_text):

    with open(model_file, "rb") as f:
        model = pickle.load(f)

    with open(vectorizer_file, "rb") as f:
        _, _, vectorizer = pickle.load(f)

    email_vector = vectorizer.transform([email_text]).toarray()

    prediction = model.predict(email_vector)[0]

    probability = model.predict_proba(email_vector)[0][1]

    return {
        "label": "Phishing" if prediction == 1 else "Not Phishing",
        "probability": float(probability)
    }
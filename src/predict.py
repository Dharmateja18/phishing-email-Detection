import pickle

model = None
vectorizer = None

def load_model(model_file, vectorizer_file):
    global model, vectorizer

    if model is None:
        with open(model_file, "rb") as f:
            model = pickle.load(f)

    if vectorizer is None:
        with open(vectorizer_file, "rb") as f:
            _, _, vectorizer = pickle.load(f)


def predict_email(model_file, vectorizer_file, email_text):

    load_model(model_file, vectorizer_file)

    email_vector = vectorizer.transform([email_text]).toarray()

    prediction = model.predict(email_vector)[0]

    probability = model.predict_proba(email_vector)[0][1]

    return {
        "label": "Phishing" if prediction == 1 else "Not Phishing",
        "probability": float(probability)
    }
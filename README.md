# 🛡️ PhishDetect AI – Phishing Email Detection System

## 📌 Project Overview
PhishDetect AI is a *machine learning based phishing email detection system* designed to identify malicious emails and protect users from phishing attacks.

The system analyzes the *content of an email* and classifies it as *Phishing* or *Legitimate* using a trained machine learning model.

The project also includes a *Chrome Extension that scans Gmail emails automatically* and displays a warning banner when a phishing email is detected.

---

## 🌐 Live Deployment

🔗 *Live Web App (Render):*  
https://phishing-email-detection-0a7t.onrender.com

🔗 *GitHub Repository:*  
https://github.com/Dharmateja18/phishing-email-Detection

---

# 🚀 Features

- Machine Learning based phishing detection
- Email content analysis using NLP
- Chrome extension for Gmail scanning
- Real-time phishing warning banner
- Manual email scanning interface
- Web application deployed online
- User friendly interface

---

# 🧠 How It Works

1. User enters email content or Gmail extension scans the email.
2. Email text is sent to the Flask backend API.
3. The machine learning model analyzes the email content.
4. The system predicts whether the email is:
   - *Phishing Email*
   - *Legitimate Email*
5. The result is displayed to the user.

---

# 🏗️ System Architecture


User / Gmail
      ↓
Chrome Extension
      ↓
Flask Backend API
      ↓
Machine Learning Model
      ↓
Prediction Result


---

# 📂 Project Structure


phishing-email-detection
│
├── chrome-extension
│   ├── manifest.json
│   ├── gmailScanner.js
│   ├── popup.html
│   ├── popup.js
│   ├── style.css
│   └── icon.png
│
├── data
│
├── models
│   └── phishing_detector.pkl
│
├── src
│   ├── preprocess.py
│   ├── train.py
│   └── predict.py
│
├── static
│   ├── css
│   └── js
│
├── templates
│   ├── base.html
│   ├── home.html
│   ├── index.html
│   ├── predict.html
│   ├── details.html
│   └── contact.html
│
├── app.py
├── requirements.txt
└── README.md


---

# ⚙️ Technologies Used

### Backend
- Python
- Flask
- Flask-CORS
- Gunicorn

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Frontend
- HTML
- CSS
- JavaScript

### Deployment
- Render Cloud Platform

### Browser Extension
- Chrome Extension API

---

# 🧪 Installation (Local Setup)

### 1️⃣ Clone the repository

bash
git clone https://github.com/Dharmateja18/phishing-email-Detection.git


### 2️⃣ Navigate to project folder

bash
cd phishing-email-Detection


### 3️⃣ Install dependencies

bash
pip install -r requirements.txt


### 4️⃣ Run the application

bash
python app.py


Open browser:


http://localhost:10000


---

# 🧩 Chrome Extension Setup

1. Open Chrome
2. Go to


chrome://extensions


3. Enable *Developer Mode*
4. Click *Load Unpacked*
5. Select the folder


chrome-extension


6. Open Gmail and the extension will automatically scan emails.

---

# 📊 Model Training

The phishing detection model was trained using labeled phishing email datasets.

Steps involved:
- Data preprocessing
- Feature extraction
- Model training
- Model evaluation
- Model saved as .pkl

---

# 🎯 Example Detection

Example phishing email:


Your package could not be delivered due to an incomplete shipping address.
Please confirm your details to reschedule delivery.

Track your delivery here:
http://delivery-status-check.net


Prediction:


⚠ Phishing Email Detected


---

# 🔮 Future Improvements

- URL phishing detection
- Email header analysis
- Deep learning based classification
- Explainable AI for phishing detection
- Multi-language phishing detection

---

# 👨‍💻 Author

*Dharma Teja*

GitHub:  
https://github.com/Dharmateja18

---

# 📜 License

This project is created for *educational and research purposes*.
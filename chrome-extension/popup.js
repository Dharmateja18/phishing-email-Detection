document.getElementById("checkBtn").addEventListener("click", async () => {

    const emailText = document.getElementById("emailText").value.trim();
    const resultBox = document.getElementById("result");

    if (!emailText) {
        resultBox.style.display = "block";
        resultBox.className = "result phishing";
        resultBox.innerText = "⚠ Please paste email text first.";
        return;
    }

    // Show loading message
    resultBox.style.display = "block";
    resultBox.className = "result";
    resultBox.innerText = "🔍 Scanning email...";

    try {

        const response = await fetch(
            "https://phishing-email-detection-0a7t.onrender.com/api/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailText
                })
            }
        );

        const data = await response.json();

        if (!data.success) {
            resultBox.className = "result phishing";
            resultBox.innerText = "⚠ Error: " + data.error;
            return;
        }

        const prediction = data.prediction.toLowerCase();
        const confidence = (data.confidence * 100).toFixed(1);

        if (prediction === "phishing") {

            resultBox.className = "result phishing";
            resultBox.innerText =
                "⚠ Phishing Email Detected\nConfidence: " + confidence + "%";

        } else {

            resultBox.className = "result legitimate";
            resultBox.innerText =
                "✓ Legitimate Email\nConfidence: " + confidence + "%";
        }

    } catch (error) {

        console.error(error);

        resultBox.className = "result phishing";
        resultBox.innerText = "⚠ Server connection failed. Try again.";

    }

});
let lastEmailText = "";

function getEmailText() {

    const emailContainer = document.querySelector("div.a3s");

    if (!emailContainer) return null;

    const text = emailContainer.innerText.trim();

    if (text.length < 20) return null;

    return text;
}

async function scanEmail() {

    const emailText = getEmailText();

    if (!emailText) return;

    if (emailText === lastEmailText) return;

    lastEmailText = emailText;

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
        });

        const data = await response.json();

        if (!data.success) return;

        if (data.prediction.toLowerCase().includes("phishing")) {

            showWarningBanner();

        }

    } catch (error) {

        console.log("Scanner error:", error);

    }

}

function showWarningBanner() {

    if (document.getElementById("phishing-warning-banner")) return;

    const banner = document.createElement("div");

    banner.id = "phishing-warning-banner";

    banner.style.background = "#ff4d4d";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.fontSize = "16px";
    banner.style.fontWeight = "bold";
    banner.style.textAlign = "center";

    banner.innerText = "⚠️ WARNING: This email appears to be a phishing attempt.";

    const emailBody = document.querySelector("div.ii.gt");

    if (emailBody) {

        emailBody.prepend(banner);

    }

}

setInterval(scanEmail, 4000);
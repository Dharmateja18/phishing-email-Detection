console.log("Phishing detector script loaded");

let lastEmail = "";

function extractEmailText() {

    const body = document.querySelector(".a3s");

    if (!body) return "";

    return body.innerText;

}

function showBanner() {

    if (document.getElementById("phishing-warning")) return;

    const banner = document.createElement("div");

    banner.id = "phishing-warning";

    banner.style.background = "#ff4d4f";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.textAlign = "center";
    banner.style.fontWeight = "bold";

    banner.innerText = "⚠️ WARNING: This email appears to be a phishing attempt.";

    const header = document.querySelector("h2");

    if (header) {
        header.parentNode.insertBefore(banner, header.nextSibling);
    }
}

function removeBanner() {

    const banner = document.getElementById("phishing-warning");

    if (banner) {
        banner.remove();
    }

}

async function scanEmail() {

    const text = extractEmailText();

    // If no email open (like inbox view)
    if (!text) {

        removeBanner();
        lastEmail = "";
        return;

    }

    if (text === lastEmail) return;

    lastEmail = text;

    console.log("Scanning email...");

    try {

        const response = await fetch(
            "https://phishing-email-detection-0a7t.onrender.com/api/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: text
                })
            }
        );

        const data = await response.json();

        console.log("Prediction:", data);

        if (data.prediction === "Phishing") {

            showBanner();

        } else {

            removeBanner();

        }

    } catch (err) {

        console.log("Scanner error:", err);

    }

}

setInterval(scanEmail, 2000);
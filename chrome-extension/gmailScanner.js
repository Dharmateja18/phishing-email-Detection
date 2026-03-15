console.log("Phishing detector script loaded");

let lastEmail = "";

function extractEmailText() {

    const body = document.querySelector(".a3s");

    if (!body) return "";

    return body.innerText;

}

function showBanner(prediction, confidence) {

    if (document.getElementById("phishing-warning")) return;

    const banner = document.createElement("div");
    banner.id = "phishing-warning";

    banner.style.display = "flex";
    banner.style.alignItems = "center";
    banner.style.justifyContent = "space-between";
    banner.style.background = "#fff3cd";
    banner.style.border = "1px solid #ffeeba";
    banner.style.borderLeft = "6px solid #dc3545";
    banner.style.padding = "12px 16px";
    banner.style.margin = "10px";
    banner.style.borderRadius = "6px";
    banner.style.fontFamily = "Arial, sans-serif";
    banner.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";

    const content = document.createElement("div");

    content.innerHTML = `
        <div style="display:flex;align-items:center;">
            <span style="font-size:20px;margin-right:10px;">⚠</span>
            <div>
                <div style="font-weight:600;color:#721c24;">
                    Suspicious Email Detected
                </div>
                <div style="font-size:13px;color:#555;">
                    This email may be a phishing attempt. Do not click unknown links.
                </div>
                <div style="font-size:12px;color:#888;margin-top:2px;">
                    Confidence: ${(confidence * 100).toFixed(1)}%
                </div>
            </div>
        </div>
    `;

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Dismiss";
    closeBtn.style.background = "#dc3545";
    closeBtn.style.color = "white";
    closeBtn.style.border = "none";
    closeBtn.style.padding = "6px 12px";
    closeBtn.style.borderRadius = "4px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontSize = "12px";

    closeBtn.onclick = () => banner.remove();

    banner.appendChild(content);
    banner.appendChild(closeBtn);

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
             showBanner(data.prediction, data.confidence);
        } else {

            removeBanner();

        }

    } catch (err) {

        console.log("Scanner error:", err);

    }

}

setInterval(scanEmail, 2000);
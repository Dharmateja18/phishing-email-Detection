console.log("Phishing Gmail scanner loaded");

let lastEmail = "";

function getEmailText() {

    let bodies = document.querySelectorAll(".a3s");

    let text = "";

    bodies.forEach(body => {
        text += body.innerText + " ";
    });

    return text.trim();
}

function showBanner() {

    if (document.getElementById("phishing-warning")) return;

    const banner = document.createElement("div");

    banner.id = "phishing-warning";

    banner.style.background = "#ff4d4f";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.fontWeight = "bold";
    banner.style.textAlign = "center";

    banner.innerText =
        "⚠️ WARNING: This email appears to be a phishing attempt.";

    const header = document.querySelector("h2");

    if (header) {
        header.parentNode.insertBefore(banner, header.nextSibling);
    }
}

async function scanEmail() {

    const text = getEmailText();

    if (!text) return;

    if (text === lastEmail) return;

    lastEmail = text;

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

        if (data.prediction === "Phishing") {

            showBanner();

        }

    } catch (error) {

        console.log("Scanner error:", error);

    }
}

setInterval(scanEmail, 3000);
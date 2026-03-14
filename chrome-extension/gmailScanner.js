let lastEmailText = "";

// Extract full email body
function getEmailBody() {

    let containers = document.querySelectorAll(".a3s");

    let text = "";

    containers.forEach(el => {
        text += el.innerText + " ";
    });

    return text.trim();
}


// Extract all links from the email
function extractLinks() {

    let links = document.querySelectorAll(".a3s a");

    let linkText = "";

    links.forEach(link => {
        linkText += " " + link.href;
    });

    return linkText;
}


// Show phishing warning banner
function showWarning(message) {

    if (document.getElementById("phish-warning")) return;

    let banner = document.createElement("div");

    banner.id = "phish-warning";

    banner.style.background = "#ff4d4d";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.fontWeight = "bold";
    banner.style.textAlign = "center";
    banner.style.fontSize = "14px";

    banner.innerText = "⚠️ WARNING: " + message;

    let container = document.querySelector("h2");

    if (container) {
        container.parentNode.insertBefore(banner, container.nextSibling);
    }
}


// Scan the email
async function scanEmail() {

    let bodyText = getEmailBody();

    let links = extractLinks();

    let emailText = bodyText + " " + links;

    if (!emailText || emailText === lastEmailText) return;

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
            }
        );

        const data = await response.json();

        if (data.prediction === "Phishing") {

            showWarning("This email appears to be a phishing attempt.");

        }

    } catch (error) {

        console.log("Scanner error:", error);

    }

}


// Gmail loads emails dynamically, so we scan repeatedly
setInterval(scanEmail, 3000);
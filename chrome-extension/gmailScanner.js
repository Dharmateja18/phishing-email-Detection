let lastEmailHash = "";


/* Extract full email text */
function getEmailText() {

    let emailBodies = document.querySelectorAll(".a3s");

    let text = "";

    emailBodies.forEach(body => {
        text += body.innerText + " ";
    });

    return text.trim();
}


/* Extract links from email */
function getEmailLinks() {

    let links = document.querySelectorAll(".a3s a");

    let urlText = "";

    links.forEach(link => {
        if (link.href) {
            urlText += " " + link.href;
        }
    });

    return urlText;
}


/* Create warning banner */
function showPhishingBanner() {

    if (document.getElementById("phish-banner")) return;

    const banner = document.createElement("div");

    banner.id = "phish-banner";

    banner.style.background = "#ff4d4f";
    banner.style.color = "white";
    banner.style.padding = "12px";
    banner.style.fontWeight = "bold";
    banner.style.textAlign = "center";
    banner.style.fontSize = "14px";

    banner.innerText =
        "⚠️ WARNING: This email appears to be a phishing attempt.";

    const toolbar = document.querySelector("h2");

    if (toolbar) {
        toolbar.parentNode.insertBefore(banner, toolbar.nextSibling);
    }
}


/* Scan the opened email */
async function scanEmail() {

    const emailText = getEmailText();
    const links = getEmailLinks();

    const combinedText = emailText + " " + links;

    if (!combinedText) return;

    const currentHash = combinedText.substring(0, 120);

    if (currentHash === lastEmailHash) return;

    lastEmailHash = currentHash;

    try {

        const response = await fetch(
            "https://phishing-email-detection-0a7t.onrender.com/api/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: combinedText
                })
            }
        );

        const data = await response.json();

        if (data.prediction === "Phishing") {

            showPhishingBanner();

        }

    } catch (error) {

        console.log("Scanner error:", error);

    }
}


/* Observe Gmail page changes */
const observer = new MutationObserver(() => {

    setTimeout(scanEmail, 1500);

});


observer.observe(document.body, {
    childList: true,
    subtree: true
});
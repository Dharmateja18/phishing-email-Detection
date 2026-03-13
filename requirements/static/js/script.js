async function handlePredict(event) {
    event.preventDefault();

    const emailContent = document.getElementById('email-content').value;
    const resultContainer = document.getElementById('result');

    if (!emailContent.trim()) {
        alert('Please enter email content');
        return;
    }

    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailContent
            })
        });

        const data = await response.json();

        if (!data.success) {
            alert("Server error: " + data.error);
            return;
        }

        const prediction = data.prediction.toLowerCase();

        resultContainer.classList.remove('phishing', 'legitimate');

        if (prediction === "phishing") {

            resultContainer.classList.add('phishing');

            document.getElementById('result-icon').textContent = "⚠️";
            document.getElementById('result-text').textContent = "PHISHING DETECTED";

        } else {

            resultContainer.classList.add('legitimate');

            document.getElementById('result-icon').textContent = "✅";
            document.getElementById('result-text').textContent = "LEGITIMATE EMAIL";
        }

        resultContainer.style.display = "block";

    } catch (error) {

        console.error(error);
        alert("Server connection failed");

    }
}
document.getElementById("checkBtn").addEventListener("click", async () => {

let emailText = document.getElementById("emailText").value;

let response = await fetch(
"https://phishing-email-detection-ml.onrender.com/predict",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
text: emailText
})
});

let data = await response.json();

document.getElementById("result").innerText =
"Prediction: " + data.prediction;

});
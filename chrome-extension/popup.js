document.getElementById("checkBtn").addEventListener("click", async () => {

let emailText = document.getElementById("emailText").value;

if(!emailText){
document.getElementById("result").innerText="Please enter email text";
return;
}

try{

let response = await fetch(
"https://phishing-email-detection-0a7t.onrender.com/api/predict",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email: emailText
})
});

let data = await response.json();

if(data.success){
document.getElementById("result").innerText =
"Prediction: " + data.prediction;
}
else{
document.getElementById("result").innerText =
"Error: " + data.error;
}

}catch(error){
document.getElementById("result").innerText="Server error";
}

});

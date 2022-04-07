$(document).ready(function () {
    let botID = document.getElementById("botid").innerHTML;
    let url = "/getBotData/?botid=" + (botID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        let botname = data.data["botname"];
        document.getElementById("titleText").innerHTML = "Let's Chat with " + botname + "!";
    })    
});

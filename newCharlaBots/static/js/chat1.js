let canonicalCode = "";
let botname = "";

$(document).ready(onReady());

async function onReady(){

    //loads the header text
    let botID = document.getElementById("botid").innerHTML;
    let url = "/getBotData/?botid=" + (botID).toString().trim();
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        botname = data.data["botname"];
        document.getElementById("titleText").innerHTML = "Let's Chat with " + botname + "!";
    })

    //gets canonical code
    url = "/getBotData/?botid=" + (botID).toString().trim();
    let canonical = fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        // console.log("input " + document.getElementById("inpu
        return data.data["canonical"];
        }
    )
    canonicalCode = await canonical;
    
    console.log(canonicalCode);
    //return canonicalCode;
}

function sendMessage(){
    if (canonicalCode == "") alert("cannoical code must not be empty");
    let response = sendMessageHelper(canonicalCode);

    bot2Messages.push(response);
    formatMessage(response);
    eraseTextInput();
    console.log(response);
    console.log("from sendMessage");

}


function formatMessage(response){

    const userInput = document.getElementById("input").value;

    let tempUser = `<div class="inputMessages"><p class="inputText">${userInput}</p></div>`;

    let tempBot = `<div class="messages"><p class="msgText">${response}</p></div>`;

    let tempInput = document.querySelector(".Transcript");
    console.log(tempInput);
    tempInput.insertAdjacentHTML("beforeend", tempUser); 

    let tempResponse = document.querySelector(".Transcript");

    tempResponse.insertAdjacentHTML("beforeend", tempBot); 


}
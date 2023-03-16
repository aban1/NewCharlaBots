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
    
    // console.log(canonicalCode);
    //return canonicalCode;
}

function sendMessage(){
    if (canonicalCode == "") alert("cannoical code must not be empty");
    let response = sendMessageHelper(canonicalCode);

    bot2Messages.push(response);
    formatMessage(response);
    eraseTextInput();
    document.getElementById("input").value = "";
}


function formatMessage(response){

    const userInput = document.getElementById("input").value;

    console.log(document.getElementById("input").value)

    inputHeight = (userInput.length / 2) + 50;

    respHeight = (response.length / 2) + 50;

    let tempUser = `<div class="inputMessages" style="height: ${inputHeight}px"><span class="inputText">${userInput}</span></div>`;

    let tempBot = `<div class="messages" style="height: ${respHeight}px"><span class="msgText">${response}</span></div>`;

    let tempInput = document.querySelector(".Transcript");
    
    tempInput.insertAdjacentHTML("beforeend", tempUser); 

    let tempResponse = document.querySelector(".Transcript");

    tempResponse.insertAdjacentHTML("beforeend", tempBot); 

    let elem = document.querySelector(".Transcript");
    elem.scrollTop = elem.scrollHeight;

}

document.getElementById("input").addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        e.preventDefault();
        document.getElementById("input").innerHTML = document.getElementById("input").innerHTML.trim();
        sendMessage();
        eraseTextInput();
    }
})
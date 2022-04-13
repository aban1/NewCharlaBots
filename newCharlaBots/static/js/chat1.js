let canonicalCode = "";

$(document).ready(onReady());

async function onReady(){

    //loads the header text
    let botID = document.getElementById("botid").innerHTML;
    let url = "/getBotData/?botid=" + (botID).toString().trim();
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        let botname = data.data["botname"];
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
    if (canonicalCode == "") alert("nope")
    console.log(sendMessageHelper(canonicalCode));
}
let canonicalCode = [];
$(document).ready(onReady());

async function onReady() {
    let botID1 = document.getElementById("botid1").innerHTML;
    let botID2 = document.getElementById("botid2").innerHTML;

    let url = "/getBotData2/?botid1=" + (botID1).toString().trim() + "&botid2=" + (botID2).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
                let botname1 = data.data1["botname"];
                let botname2 = data.data2["botname"];
                document.getElementById("titleText").innerHTML = "Let's have " + botname1 + " chat with " + botname2 + "!";
                document.getElementById("bot1").innerHTML = botname1;
                document.getElementById("bot2").innerHTML = botname2;
                document.getElementById("input").placeholder = "Enter " + botname1 + "'s starting message ...";
    })

    canonicalCode = await getCanonicalCode(botID1, botID2);
}

async function getCanonicalCode(botID1, botID2){
    let url = "/getBotData/?botid=" + (botID1).toString().trim();
    let canonical1 = fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        return data.data["canonical"];
        }
    )
    let canonicalCode1 = await canonical1;
    canonicalCode.push(canonicalCode1);

    url = "/getBotData/?botid=" + (botID2).toString().trim();
    let canonical2 = fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        // console.log("input " + document.getElementById("inpu
        return data.data["canonical"];
        }
    )
    let canonicalCode2 = await canonical2;
    canonicalCode.push(canonicalCode2);

    return canonicalCode;
}

function startChat(){
    let initialMessage = document.getElementById("input").value;

    msgHeight = (initialMessage.length / 2) + 50;
    let tempInput = document.querySelector(".Transcript");
    let bot1Msg = `<div class="inputMessages" style="height: ${msgHeight}px"><p class="inputText">${initialMessage}</p></div>`;
    tempInput.insertAdjacentHTML("beforeend", bot1Msg);

    chatHelper();
    document.getElementById("input").value = initialMessage;
}
//bot1 should start the chat
async function chatHelper(){
    
    let numResponses = document.getElementById("numResponses").value;
    messages = [];

    for(let i = 0; i < numResponses; i++){

        let canonical = (i % 2 == 1) ? canonicalCode[0] : canonicalCode[1];
        let message = sendMessageHelper(canonical);
        console.log(message);
        messages.push(message);
        document.getElementById("input").value = message;

        msgHeight = (message.length / 2) + 50;

        let tempInput = document.querySelector(".Transcript");

        if (i % 2 == 1){
            let bot1Msg = `<div class="inputMessages" style="height: ${msgHeight}px"><p class="inputText">${message}</p></div>`;
            tempInput.insertAdjacentHTML("beforeend", bot1Msg);
        }
        else{
            let tempBot = `<div class="messages" style="height: ${msgHeight}px"><span class="msgText">${message}</span></div>`;
            tempInput.insertAdjacentHTML("beforeend", tempBot); 
        }
    }
    console.log(messages)
    return messages
}
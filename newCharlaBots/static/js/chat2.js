$(document).ready(function () {
    let botID1 = document.getElementById("botid1").innerHTML;
    let botID2 = document.getElementById("botid2").innerHTML;

    let url = "/getBotData2/?botid1=" + (botID1).toString().trim() + "&botid2=" + (botID2).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
                let botname1 = data.data1["botname"];
                let botname2 = data.data2["botname"];
                document.getElementById("titleText").innerHTML = "Let's have " + botname1 + " chat with " + botname2 + "!";
    })
});


function startChat(){
    let initialMessage = document.getElementById("input").value;
    chatHelper();
    document.getElementById("input").value = initialMessage;
}
//bot1 should start the chat
async function chatHelper(){
    
    let numResponses = document.getElementById("numResponses").value;

    let botID1 = document.getElementById("botid1").innerHTML.trim();
    let botID2 = document.getElementById("botid2").innerHTML.trim();

    messages = [];

    for(let i = 0; i < numResponses; i++){

        let bot = (i % 2 == 1) ? botID1 : botID2;
        sendMessage(bot).then((val) =>{
            messages.push(val);
            document.getElementById("input").value = val;
        })
    }
    console.log(messages)
    return messages
    
}

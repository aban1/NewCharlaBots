$(document).ready(function () {
    let botID1 = document.getElementById("botid1").innerHTML;
    let botID2 = document.getElementById("botid2").innerHTML;

    console.log(botID1);
    console.log(botID2);

    let url = "/getBotData2/?botid1=" + (botID1).toString().trim() + "&botid2=" + (botID2).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
                let botname1 = data.data1["botname"];
                let botname2 = data.data2["botname"];
                console.log(botname2);

                document.getElementById("titleText").innerHTML = "Let's have " + botname1 + " chat with " + botname2 + "!";
    })

    

});

function startChat(){

    //get data from first message and num responses

    //let firstMessage = document.getElementById("input").value

    let numResponses = document.getElementById("numResponses").value;

    let botID1 = document.getElementById("botid1").innerHTML.trim();
    let botID2 = document.getElementById("botid2").innerHTML.trim();

    messages = [];



    for(let i = 0; i < numResponses; i++){
        document.getElementById("input").value = document.getElementById("output").value;
        if(i % 2 == 0){
            messages.push(sendMessage(botID1))
        }
        else{
            messages.push(sendMessage(botID2))
        }
        // messages.append(document.getElementById("output").value)
        console.log(document.getElementById("output").value);
    }
    console.log(messages)
    return messages
    
}


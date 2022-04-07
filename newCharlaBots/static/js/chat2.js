$(document).ready(function () {
    let botID1 = document.getElementById("botid1").innerHTML;
    let botID2 = document.getElementById("botid2").innerHTML;

    console.log(botID1);
    console.log(botID2);//this is nothing

    let url = "/getBotData2/?botid1=" + (botID1).toString().trim() + "?botid2=" + (botID2).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
                let botname1 = data.data1["botname"];
                let botname2 = data.data2["botname"];
                console.log(botname2);

                document.getElementById("titleText").innerHTML = "Let's have " + botname1 + " chat with " + botname2 + "!";
    })    
});
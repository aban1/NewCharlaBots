$(document).ready(function () {
    console.log("start!!!")
    //get end of url to see what bot id we are looking for

    let botid = document.getElementById("botid").innerHTML;
    console.log(botid);
    let url = "/getBotData/?botid=" + toString(botid);
    
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

        console.log(data)

        document.getElementById("botname").value = data.data["botname"];
        document.getElementById("canonical").value = data.data["canonical"];

        console.log(data.data["botname"]);
        console.log(document.getElementById("botname").innerHTML);

        
    })



});

function interpretCode(){
    console.log("here");
}
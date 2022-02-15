$(document).ready(function () {
    console.log("start!!!")
    //get end of url to see what bot id we are looking for
    let botid = document.getElementById("botid").innerHTML;
    let langid = document.getElementById("langid").innerHTML;
    console.log(botid);
    let url = "/getBotData/?botid=" + (botid).toString().trim();

    console.log(url);
    
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

        console.log(data)

        document.getElementById("botname").value = data.data["botname"];
        document.getElementById("canonical").value = data.data["canonical"];
        
        //load the code based on selected lang

        console.log(data.data["botname"]);
        console.log(document.getElementById("botname").innerHTML);

        
    })



});

function saveBot(){
    console.log("here");
    let botname = document.getElementById("botname").value;

    
    let canonical = document.getElementById("canonical").value;

    //send back to db

}
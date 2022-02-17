$(document).ready(function () {
    console.log("start!!!")
    //get end of url to see what bot id we are looking for            
    let botID = document.getElementById("botid").innerHTML;
    let url = "/getBotData/?botid=" + (botID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

        let botID = document.getElementById("botid").innerHTML;
        let langID = document.getElementById("langid").innerHTML;
        
        document.getElementById("botname").value = data.data["botname"];
        let canonical = data.data["canonical"];

        let code = translateCanonicalCode(langID, canonical);
        document.getElementById("canonical").value = code;

        

        console.log(data.data["botname"]);
        console.log(document.getElementById("botname").innerHTML);
    })

});
var mapping = {};
//look at the database to see what user code the keyword maps to
function getMappings(langID){
    let url = "/getLanguageData/?langid=" + (langID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        mapping["ifAny"]= data["ifAny"];
        mapping["andNotAny"]= data["andNotAny"];
        mapping["ifAll"]= data["ifAll"];
        mapping["andNotAll"]= data["andNotAll"];
        mapping["replyLine"]= data["replyLine"];
        mapping["startReply"]= data["startReply"];
        mapping["endReply"]= data["endReply"];
        mapping["endIf"]= data["endIf"];
        mapping["pickRandom"]= data["pickRandom"];
        mapping["endPick"]= data["endPick"];

        middleman(mapping)


    })
}

function middleman(){

    canonicalCode = 

    translateCanonicalCode(mapping, cannonicalcode)


}

    



//translates canonical code to user code
function translateCanonicalCode(langID, canonicalCode){
    //parse thru code until see {

    //let mapping = getMappings(langID);
    console.log(mapping);

    let translatedCode = "";
    for (let i = 0; i< canonicalCode.length; i++){
        if (canonicalCode[i]== "{"){
            let keyword = "";
            i++; //don't want to include first { 

            for (; i< canonicalCode.length; i++){
                if (canonicalCode[i] != "}"){
                    keyword +=canonicalCode[i];
                }
                else{ break;}

            }
            //add mapped keyword in user specified language
            console.log("in loop")
            console.log(mapping);
            keyword = "ifAny"
            console.log(mapping[keyword]);
            translatedCode += mapping[keyword];

        }
        else{
            translatedCode += canonicalCode[i];
        }
    }
    console.log(translatedCode);
    return translatedCode;
}

function saveBot(){
    console.log("here");
    let botname = document.getElementById("botname").value;

    
    let canonical = document.getElementById("canonical").value;

    //send back to db

}
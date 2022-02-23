$(document).ready(function () {
    console.log("start!!!")
    //get end of url to see what bot id we are looking for            
    let botID = document.getElementById("botid").innerHTML;
    let langID = document.getElementById("langid").innerHTML;
    let url = "/getBotAndLang/?botID=" + (botID).toString().trim() + "&langID=" + (langID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

        let botID = document.getElementById("botid").innerHTML;
        let langID = document.getElementById("langid").innerHTML;

        console.log(data)
        
        document.getElementById("botname").value = data.botInfo["botname"];
        
        let canonical = data.botInfo["canonical"];
        let mappings = data.langInfo;

        let translatedCode = translateCanonicalCode(mappings, canonical);
        document.getElementById("canonical").value = translatedCode;
    })

});

//TODO: fix spacing
//translates canonical code to user code
function translateCanonicalCode(mapping, canonicalCode){
    //parse thru code until see {

    console.log("in translate");
    console.log(mapping);
    
    let translatedCode = "";
    for (let i = 0; i < canonicalCode.length; i++){
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
            let translatedKeyword = mapping[keyword].trim();

            if (!(translatedKeyword.startsWith("and") ||
                translatedKeyword.startsWith("if") ||
                translatedKeyword.startsWith("end"))){
                //if it does not start w "and", if, end, add 4 spaces
                translatedCode += "    " + translatedKeyword;
            }
            else{
                translatedCode += translatedKeyword;
            }
        }
        else{
            translatedCode += canonicalCode[i];
        }
    }
    console.log(translatedCode);
    
    return translatedCode;
}

//TODO: what constitutes as an error
function saveBot(){
    let botname = document.getElementById("botname").value;
    let langID = document.getElementById("langid").innerHTML;
    
    let url = "/getLanguageData/?langid=" + (langID).toString().trim();
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

        let code = "";
        let translatedCode = document.getElementById("canonical").value; 
        let translatedLines = translatedCode.split("\n");
        console.log(translatedLines)
        let mappings = data.data;
    
        for(let i = 0; i < translatedLines.length; i++){
            let line = translatedLines[i].trim();
            

            //check if lines starts with any of the mappings
            // checkForKeyword(line, )
        }
    })
    //translate back to canonical
    //send back to db
}

function checkForKeyword(mapping, line){
    let mappingKeys = ["ifAny", "languageid", "andNotAny", "ifAll", "andNotAll", 
        "replyLine", "startReply", "endReply", "endIf", "pickRandom", "endPick"]

    if (line.startsWith(mapping["ifAny"])){
        return 
    }
}

$(document).ready(function () {
    //get end of url to see what bot id we are looking for            
    let botID = document.getElementById("botid").innerHTML;
    let langID = document.getElementById("langid").innerHTML;
    let url = "/getBotAndLang/?botID=" + (botID).toString().trim() + "&langID=" + (langID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        
        document.getElementById("botname").value = data.botInfo["botname"];
        
        let canonical = data.botInfo["canonical"];
        let mappings = data.langInfo;

        let translatedCode = translateCanonicalCode(mappings, canonical);
        document.getElementById("canonical").value = translatedCode;
    })

});

//translates canonical to user code
function translateLineToUser(mapping, line){
    let translatedLine = "";
    console.log(line);
    for (j = 0; j < line.length; j++){
        let keyword = "";

        if (line[j] == "{"){
            j++;
            for (; j< line.length; j++){
                if (line[j] != "}"){
                    keyword +=line[j];
                }
                else{ break;}
            }
            let translatedKeyword = mapping[keyword].trim();
            
            //if it does not start w "and", if, end, add 4 spaces
            if (!(keyword.startsWith("and") || keyword.startsWith("if") ||
                keyword.startsWith("end"))){
                translatedLine += "    " + translatedKeyword;
            }
            else{
                translatedLine += translatedKeyword;
            }
            if (translatedKeyword.startsWith("end")){
                translatedLine += "\n";
            }
        }
        //not a keyword
        else{
            translatedLine += line[j];
        }
    }
    return translatedLine;
}

//translates canonical code to user code
function translateCanonicalCode(mapping, canonicalCode){
    let translatedCode = "";
    let linesToTranslate = canonicalCode.split("////");

    for (let i = 0; i < linesToTranslate.length; i++){//loops thru each line of code
        let translatedLine = translateLineToUser(mapping, linesToTranslate[i]);
        translatedCode += translatedLine +"\n";
    }
    return translatedCode;
}

//TODO: alert error if trying to save a bot with error
//what constitutes as an error?
//just alert or tell them the error
function saveBot(){
    let langID = document.getElementById("langid").innerHTML;
    
    let url = "/getLanguageData/?langid=" + (langID).trim();
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

        let canonicalCode = "";
        let translatedCode = document.getElementById("canonical").value; 
        let translatedLines = translatedCode.split("\n");
        let mappings = data;
    
        for(let i = 0; i < translatedLines.length; i++){
            let line = translatedLines[i].trim();
            line = translateLineToCanonical(mappings, line);
            canonicalCode += line;
        }
        //send the updated code back to database
        updateCanonicalCode(canonicalCode);
    })
}

//translate a line from user language to canonical code
function translateLineToCanonical(mapping, line){
    let mappingKeys = ["ifAny", "languageid", "andNotAny", "ifAll", "andNotAll", 
        "replyLine", "startReply", "endReply", "endIf", "pickRandom", "endPick"]

    //check if line starts with any of the keywords
    for (let i = 0; i< mappingKeys.length; i++){
        if (line.startsWith(mapping[mappingKeys[i]])){

            let lastWords = line.slice(mapping[mappingKeys[i]].length);
            let canonical_str = "{" + mappingKeys[i] + "}" + lastWords + "////";
            return canonical_str;
        }
    }
    return line;
}

//should not change what the code looks like
function updateCanonicalCode(canonicalCode){

    let botID = document.getElementById("botid").innerHTML;
    let botName = document.getElementById("botname").value;
    let url = "/updateBot/?botID=" + (botID).toString().trim() + "&botName=" + (botName).toString().trim() + "&canonicalCode=" + canonicalCode;
    fetch(url, {method: 'PATCH'});
}


//NEXT STEPS: create bot 
//be able to chat with a bot
//edge case: i.e. if not happy and not sad
//TODO: version history 
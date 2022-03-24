var isEditor = false;
const newline = "(nw-ln)";
$(document).ready(function () {

    //get end of url to see what bot id we are looking for            
    isEditor = document.getElementById("titleText").innerHTML.includes("Edit");
    //run the rest of ready func only if editing
    if (!isEditor) return;
    
    let botID = "";
    if (document.getElementById("botid")){
        botID = document.getElementById("botid").innerHTML;
    }

    let langID = document.getElementById("langid").innerHTML;

    let url = "/getBotAndLang/?botID=" + (botID).toString().trim() + "&langID=" + (langID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        
        document.getElementById("botname").value = data.botInfo["botname"];
        
        let canonical = data.botInfo["canonical"];

        let mappings = data.langInfo;
        
        let description = data.botInfo["description"];
        document.getElementById("description").value = description;

        let translatedCode = translateCanonicalCode(mappings, canonical);
        document.getElementById("canonical").value = translatedCode;
    })

});

//translates canonical to user code
function translateLineToUser(mapping, line){
    let translatedLine = "", prevKeyword = "", keyword = "";

    for (j = 0; j < line.length; j++){
        prevKeyword = keyword;
        keyword = "";

        if (line[j] == "{"){
            j++;
            for (; j< line.length; j++){
                if (line[j] != "}"){
                    keyword +=line[j];
                }
                else{ break;}
            }
            let translatedKeyword = mapping[keyword].trim();
            
            if (keyword.startsWith("reply")){
                translatedLine += "    " + translatedKeyword;
            }
            else{
                translatedLine += translatedKeyword;
            }
        }
        //not a keyword
        else {
            if (!(prevKeyword.startsWith("if") || prevKeyword.startsWith("reply") || prevKeyword.startsWith("and"))){
                translatedLine += "    ";
            }
            while (j < line.length && line[j] != "{"){
                translatedLine += String(line[j]);
                j++;
            }
            j--;
        }
    }
    return translatedLine;
}

//translates canonical code to user code
function translateCanonicalCode(mapping, canonicalCode){
    let translatedCode = "";
    let linesToTranslate = canonicalCode.split(newline);
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
            if (i != translatedLines.length-1){
                canonicalCode += newline;
            }
        }
        //send the updated code back to database
        updateCanonicalCode(canonicalCode);
    })
}

//translate a line from user language to canonical code
function translateLineToCanonical(mapping, line){
    let mappingKeys = ["ifAny", "andNotAny", "ifAll", "andNotAll", 
        "replyLine", "startReply", "endReply", "endIf", "pickRandom", "endPick"]
    let notKeys = ["andNotAny", "andNotAll"]
    //check if line starts with any of the keywords
    let canonical_str = "";
    for (let i = 0; i< mappingKeys.length; i++){
        if (line.startsWith(mapping[mappingKeys[i]])){

            let lastWords = line.slice(mapping[mappingKeys[i]].length);
            canonical_str = "{" + mappingKeys[i] + "}" + lastWords;
            break;
        }
    }

    for (let i = 0; i< notKeys.length; i++){
        let index = canonical_str.indexOf(mapping[notKeys[i]]);
        if (index != -1){
            let before = canonical_str.slice(0, index);
            let key = notKeys[i];
            let after = canonical_str.slice(index + mapping[notKeys[i]].length);
            canonical_str = before + "{" + key + "}" + after;
            break;
        }
    }
    if (canonical_str == ""){ return line; }
    return canonical_str;
}

//sends updated code, description and values back to db
function updateCanonicalCode(canonicalCode){
    
    let botName = document.getElementById("botname").value.toString().trim();
    let description = document.getElementById("description").value;
    alert(canonicalCode);
    if (isEditor){
        let botID = document.getElementById("botid").innerHTML.toString().trim();    
        let url = "/updateBot/?botID=" + botID + "&botName=" + botName + "&canonicalCode=" + canonicalCode + "&description=" + description;
        fetch(url, {method: 'PATCH'});    
    }
    else{
        let url = "/createBot/?botName=" + botName + "&canonicalCode=" + canonicalCode + "&description=" + description;
        fetch(url, {method: 'POST'});
    }
}

//event listener for tabbing within textarea
document.getElementById('canonical').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "    " + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 4;
    }
  });

    //put the languages in
    //start error checking:
        //includes spelling errors, forgot end match...
//be able to chat with a bot
//TODO: version history 
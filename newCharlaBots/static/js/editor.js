var isEditor = false;
const newline = "fasldkjfnads";
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

        //when console.logging canonical, it does not include the #comments even though it was saved with it
        console.log(canonical);
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
    let linesToTranslate = canonicalCode.split(newline);
    console.log(linesToTranslate);
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

    console.log(langID)
    
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
    let notKeys = ["andNotAny", "andNotAll"]
    //check if line starts with any of the keywords
    let canonical_str = "";
    for (let i = 0; i< mappingKeys.length; i++){
        if (line.startsWith(mapping[mappingKeys[i]])){

            let lastWords = line.slice(mapping[mappingKeys[i]].length);
            canonical_str = "{" + mappingKeys[i] + "}" + lastWords + newline;
            break;
        }
    }

    //todo: fix this
    for (let i = 0; i< notKeys.length; i++){
        let index = line.includes(mapping[notKeys[i]]);
        if (line.includes(mapping[notKeys[i]])){
            let before = line.slice(0, index - 1);
            let key = notKeys[i];
            let after = line.slice(index + key.length);
            canonical_str = before + "{" + key + "}" + after;
            break;
        }
    }


    return line;
}

//sends updated code,description and values back to db
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

//event listeners
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

  //todo:
    //add comments to code starting with "#"
    //put the languages in so mark is not dissapointed
    //start error checking:
        //includes spelling errors, forgot end match...
//be able to chat with a bot
//edge case: i.e. if not happy and not sad
//TODO: version history 
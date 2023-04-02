var isEditor = false;
const newline = "(nw-ln)";
$(document).ready(function () {

    //get end of url to see what bot id we are looking for            
    isEditor = document.getElementById("titleText").innerHTML.includes("Edit");
    //run the rest of ready func only if editing
    if (!isEditor) return;
    
    // gets botid
    let botID = "";
    if (document.getElementById("botid")){
        botID = document.getElementById("botid").innerHTML;
    }

    let langID = document.getElementById("langid").innerHTML;

    let url = "/getBotAndLang/?botID=" + (botID).toString().trim() + "&langID=" + (langID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        
        // loads titles that use bot names
        document.getElementById("botname").value = data.botInfo["botname"];
        document.getElementById("titleText").innerHTML = "Edit " + data.botInfo["botname"];
        document.getElementById("editCode").innerHTML = "Edit " + data.botInfo["botname"] +"'s Code Below &#x2193;"

        // loads existing bot description
        let description = data.botInfo["description"];
        document.getElementById("description").value = description;

        // loads existing bot code
        let canonical = data.botInfo["canonical"];
        let mappings = data.langInfo;
        let translatedCode = translateCanonicalCode(mappings, canonical);
        syntaxHighlighting(mappings, translatedCode);
        document.getElementById("editor").innerHTML = translatedCode;
        
        updateScreen($("#editor").val());

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
        translatedCode += translatedLine;
        if (i < linesToTranslate.length-1){
            translatedCode += "\n";
        }
    }
    return translatedCode;
}

// create more vectors here for more color categories for syntax  highlighting https://stackoverflow.com/questions/37139076/change-color-of-specific-words-in-textarea */
var conds = []; //ifAny, andNotAny, ifAll, andNotAll
var replies = []; //startReply, endReply
var picks = []; // pickRandom, endPick

// applies syntax highlighting to code editting area
function syntaxHighlighting(mapping, translatedCode){

    let linesToTranslate = translatedCode.split("\n");

    let mappingKeys = ["ifAny", "andNotAny", "ifAll", "andNotAll", 
    "replyLine", "startReply", "endReply", "endIf", "pickRandom", "endPick"]

    for (let j = 0; j < linesToTranslate.length; j++){
        let line = linesToTranslate[j].trim();
        if (line == "") continue;
  
        for (let i = 0; i< mappingKeys.length; i++){
 
            if (line.startsWith(mapping[mappingKeys[i]])){
       
                if (mappingKeys[i] == "ifAny" || mappingKeys[i] == "endIf" || mappingKeys[i] == "ifAll" || mappingKeys[i] == "andNotAll"){

                    conds.push(mapping[mappingKeys[i]]);
                }

                else if(mappingKeys[i] == "startReply" || mappingKeys[i] == "endReply"){
     
                    replies.push(mapping[mappingKeys[i]]);
                }

                else if(mappingKeys[i] == "pickRandom" || mappingKeys[i] == "endPick" ){

                    picks.push(mapping[mappingKeys[i]]);
                }

            }
        }
    }

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
        let translatedCode = document.getElementById("editor").value; 
  
        let translatedLines = translatedCode.split("\n");
        let mappings = data;
    
        for(let i = 0; i < translatedLines.length; i++){
            let line = translatedLines[i].trim();
            if (line == "") continue;
            line = translateLineToCanonical(mappings, line);
            canonicalCode += line;
            if (i != translatedLines.length - 1){
                canonicalCode += newline;
            }
        }
        canonicalCode.trim();
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
    //check the botname field
    //if the botname already exists on a different botID, then tell them that the name is taken
    
    let botName = document.getElementById("botname").value.toString().trim();
    let description = document.getElementById("description").value;
    let botID = document.getElementById("botid")
    if (!botID) {
        botID = -1;
    } else {
        botID = botID.innerHTML
    }

    let url = "/getAllBotNames";
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
            
            // can't make bot name empty
            if(botName.length == 0){
                alert("Name can't be empty")

            }

            else{

                //checks for duplicate name 
                let isNameMatch = false;
                for(let i = 0; i < data.data.length; i++){
    
                    if(botName == data.data[i].name && botID != data.data[i].key) {
    
                        alert("That name is already taken, please choose another one")
                        isNameMatch = true;
                        break;
                    } 
                }
                
                // does not allow you to edit a bot name to match another one
                if (!isNameMatch){
                    if (isEditor){
                        let botID = document.getElementById("botid").innerHTML.toString().trim();    
                        let url = "/updateBot/?botID=" + botID + "&botName=" + botName + "&canonicalCode=" + canonicalCode + "&description=" + description;
                        fetch(url, {method: 'PATCH'});    
                    }
                    else{
                        console.log("adding canonical code: ", canonicalCode);
                        let url = "/createBot/?botName=" + botName + "&canonicalCode=" + canonicalCode + "&description=" + description;
                        fetch(url, {method: 'POST'});
                    }
                    alert("Update Code Success!")
                }
            }


    })
    
}

// code edit area functionality
updateScreen($("#editor").val());
$("#editor").on("keydown", function(e) {
  setTimeout(() =>{
    updateScreen($(this).val());
  },0)
})
function updateScreen(text)
{
  $("#out").html(colorize(text.replace(/\n/g, "<br>").replace(/\t/g,"&#9;"), text.split(/\r?\n/)));
}
$("#editor").on('scroll', function(){
  // set out to be the same as in
  $("#out").css({top:-$(this).scrollTop()+"px"});   
});

// colors words for syntax highlighting 
function colorize(text, lines)
{

    // colors comments green
    for(const line of lines){
        if(line.includes("//")){
            
            comment = line.split("//")[1]
            console.log(comment)
            text = text.replace("//" + comment, `<span style="color:LightGreen">//${comment}</span>`)
        }
    }

    // colors conditionals CornflowerBlue
    for(const cond of conds)
    {
        text = text.replaceAll(cond,`<span style="color:CornflowerBlue">${cond}</span>`)
        text = text.replaceAll(cond.toLowerCase(),`<span style="color:CornflowerBlue">${cond.toLowerCase()}</span>`)
    }

    // colors reply words DarkOrchid
    for(const reply of replies)
    {
        text = text.replaceAll(reply,`<span style="color:DarkOrchid">${reply}</span>`)
        text = text.replaceAll(reply.toLowerCase(),`<span style="color:DarkOrchid">${reply.toLowerCase()}</span>`)
    }

    // colors pick words Orchid
    for(const pick of picks)
    {
        text = text.replaceAll(pick,`<span style="color:Orchid">${pick}</span>`)
        text = text.replaceAll(pick.toLowerCase(),`<span style="color:Orchid">${pick.toLowerCase()}</span>`)
    }

    return text
}


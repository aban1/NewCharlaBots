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
        
        document.getElementById("botname").value = data.botInfo["botname"];
        
        let canonical = data.botInfo["canonical"];
        let mappings = data.langInfo;

        let translatedCode = translateCanonicalCode(mappings, canonical);
        document.getElementById("canonical").value = translatedCode;
    })

});

//translates canonical to user
function translateLineToUser(mapping, line){
    let translatedLine = "";

    console.log("in translated code")

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
            console.log(keyword);
            let translatedKeyword = mapping[keyword].trim();
            console.log(translatedKeyword)
            if (!(translatedKeyword.startsWith("and") ||
                translatedKeyword.startsWith("if") ||
                translatedKeyword.startsWith("end"))){
                //if it does not start w "and", if, end, add 4 spaces
                translatedLine += "    " + translatedKeyword;
            }
            else{
                translatedLine += translatedKeyword;
            }
        }
        //not a keyword
        else{
            translatedLine += line[j];
        }
    }

    return translatedLine;

}

//TODO: fix spacing
//translates canonical code to user code
function translateCanonicalCode(mapping, canonicalCode){
    //parse thru code until see {

    console.log("in translate");
    console.log(canonicalCode);
    let translatedCode = "";

    let linesToTranslate = canonicalCode.split("////");
    console.log(linesToTranslate);

    for (let i = 0; i < linesToTranslate.length; i++){//loops thru each line of code
        let translatedLine = translateLineToUser(mapping, linesToTranslate[i]);
        translatedCode += translatedLine +"\n";
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

        let canonicalCode = "";
        let translatedCode = document.getElementById("canonical").value; 
        let translatedLines = translatedCode.split("\n");
        let mappings = data;
    
        for(let i = 0; i < translatedLines.length; i++){
            let line = translatedLines[i].trim();
            line = translateLineToCanonical(mappings, line);
            canonicalCode += line;
        }
        //send it back
        updateCanonicalCode(canonicalCode);
    })
    //translate back to canonical
    //send back to db
}

//returns canonical code from of a keyword
function translateLineToCanonical(mapping, line){
    let mappingKeys = ["ifAny", "languageid", "andNotAny", "ifAll", "andNotAll", 
        "replyLine", "startReply", "endReply", "endIf", "pickRandom", "endPick"]

    //for loop thru mapping keys, check if line starts with any of them
    for (let i = 0; i< mappingKeys.length; i++){
        if (line.startsWith(mapping[mappingKeys[i]])){

            let lastWords = line.slice(mapping[mappingKeys[i]].length);
            let canonical_str = "{" + mappingKeys[i] + "}" + lastWords + "////";

            return canonical_str;
            //length of how much we want to chop of is mapping[mappingKeys[i].length 
        }
    }
    return line;
}

//should not change what the code looks like
function updateCanonicalCode(canonicalCode){

    //fetch
    let botID = document.getElementById("botid").innerHTML;
    let botName = document.getElementById("botname").value;
    console.log(botID);
    console.log(canonicalCode);
    let url = "/updateBot/?botID=" + (botID).toString().trim() + "&botName=" + (botName).toString().trim() + "&canonicalCode=" + canonicalCode;
    console.log(url)
    fetch(url, {method: 'PATCH'});
}




//TODO: version history 


// for (let i = 0; i < canonicalCode.length; i++){
//     if (canonicalCode[i]== "{"){
//         let keyword = "";
//         i++; //don't want to include first { 

//         for (; i< canonicalCode.length; i++){
//             if (canonicalCode[i] != "}"){
//                 keyword +=canonicalCode[i];
//             }
//             else{ break;}
//         }
//         //add mapped keyword in user specified language
//         let translatedKeyword = mapping[keyword].trim();

//         if (!(translatedKeyword.startsWith("and") ||
//             translatedKeyword.startsWith("if") ||
//             translatedKeyword.startsWith("end"))){
//             //if it does not start w "and", if, end, add 4 spaces
//             translatedCode += "    " + translatedKeyword;
//         }
//         else{
//             translatedCode += translatedKeyword;
//         }
//     }
//     else{
//         translatedCode += canonicalCode[i];
//     }
// }
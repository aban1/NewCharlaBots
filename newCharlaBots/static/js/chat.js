const newline = "(nw-ln)";;
const comment = "//"
$(document).ready(function () {
    let botID = document.getElementById("botid").innerHTML;
    let url = "/getBotData/?botid=" + (botID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        let botname = data.data["botname"];
        document.getElementById("titleText").innerHTML = "Let's Chat with " + botname + "!";
    })    
});

//inputs lines of canonical code, returns canonical code as array of 'blocks'
function getBlocks(lines){
    lines = lines.split(newline);
    let blocks = [];
    let blockString = "";

    for (let i = 0; i < lines.length; i++){
        let line = lines[i];

        let keyword = "";
        for (let j = 0; j < line.length; j++){

            if (line[j] == "{"){
                j++;
                for (; j< line.length; j++){
                    if (line[j] != "}"){
                        keyword +=line[j];
                    }
                    else{ break;}
                }
            }

            if (j < line.length-1 && line[j] && line[j+1] == "/"){
                line = line.slice(0,j-1);
                break;
            }
        }
        blockString += line + " ";

        if (keyword.startsWith("end")){
            isEnd = true;
            blocks.push(blockString);
            blockString = "";
        }
    }    
    return blocks;
}

//returns the keyword if found, false if not
function checkForKeyword(word){
    if (word[0] != "{" || word[word.length - 1] != "}") return false;
    else return word.slice(1,-1)
}

function removeComma(word){
    if (word[word.length] == ","){
        word = word.slice(0,1);
    }
    return word;
}

//TODO: deal with pick randoms 
//input: array of 'blocks' of canonical code
//returns: array of dictionary of rules
function createCanonicalArray(blocks){
    let interpretedCode = [];
    for (let i = 0; i < blocks.length; i++){
        let rulesDict = {
            "keyword" : "",
            "words" : [],
            "keywordNOT": "",
            "wordsNOT": [],
            "response" : []
        };
        let words = blocks[i].split(" ");
        let keyword = checkForKeyword(words[0]);
        //error checking
        if (keyword == false){
            alert("ERROR: no keyword at start, check code for assistance")
            return;
        }
        else{
            rulesDict["keyword"] = keyword;  //gets the first keyword as keyword
        }

        let endloop = false;
        for (let j = 1 ; j < words.length; j++){
            if (endloop == true){ break; }
            //while it's not a keyword, add word to "words"
            if (!checkForKeyword(words[j])){
                rulesDict["words"].push(removeComma(words[j]));
            }
            //it is a NOT keyword
            else if (checkForKeyword(words[j]).startsWith("and")){
                rulesDict["keywordNOT"] = checkForKeyword(words[j]);
                //loop through the not keywords
                for (j = j + 1; j<words.length; j++){
                    //if it IS a keyword, we are at the response, end the loop
                    if (!checkForKeyword(words[j])){                    
                        rulesDict["wordsNOT"].push(removeComma(words[j]));
                    }
                    else{ 
                        endloop = true;
                        break;
                    }
                }
            }
            else{ break; }
        }
        //all other code except for end statements are the response
        let responseStr = "";
        for (; j < words.length - 1; j++){
            if (words[j].startsWith("{")) break;
            responseStr += words[j] + " ";
        }
        rulesDict["response"].push(responseStr);
        interpretedCode.push(rulesDict);
    }
    return interpretedCode;
}

function sendMessage(){
    //fetch canonical code
    let botID = document.getElementById("botid").innerHTML;
    let url = "/getBotData/?botid=" + (botID).toString().trim();

    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        let canonicalCode = data.data["canonical"];
        let blocks = getBlocks(canonicalCode);
        let canonicalArray = createCanonicalArray(blocks);    
    })    

}
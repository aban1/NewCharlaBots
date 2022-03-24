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

//blocks is an array of strings. remove empty elements from array
function blocksHelper(blocks){
    let ret = [];
    for (let i = 0; i< blocks.length; i++){
        if (blocks[i] != ""){
            ret.push(blocks[i].trim());
        }
    }
    return ret;
}

//inputs lines of canonical code, returns canonical code as array of 'blocks'
//deal with pickRandom code differently to differentiate between the different options
//  for pickRadom, do not delete the newlines chars from canonical code
//TODO: deal with pickRandom
function getBlocks(lines){
    lines = lines.split(newline);
    let linesCopy = lines;
    let blocks = [];
    let blockString = "";

    for (let i = 0; i < lines.length; i++){
        let line = lines[i];

        let keyword = "";
        let pickRandomBlock = false;

        for (let j = 0; j < line.length; j++){

            if (line[j] == "{"){
                j++;
                while (line[j] != "}" && j < line.length){
                    keyword +=line[j];
                    j++;
                }
                if (keyword == "pickRandom"){
                    pickRandomBlock = true;
                }
            }

            //ignore comments
            if (j < line.length-1 && line[j] == "/" && line[j+1] == "/"){
                line = line.slice(0,j-1);
                break;
            }
        }
        if (pickRandomBlock){
            blockString += line + newline;
        }
        else{ 
            blockString += line + " ";
        }
        if (keyword.startsWith("end")){
            blocks.push(blockString);
            blockString = "";
        }
    }

    return blocksHelper(blocks);
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

//not tested
function createDictForPickRandom(block){
    let rulesDict = {
        "keyword" : "",
        "words" : [],
        "keywordNOT": "",
        "wordsNOT": [],
        "response" : []
    };
    rulesDict.push("pickRandom");

}
//TODO: deal with pick randoms 
//input: array of 'blocks' of canonical code
//returns: array of dictionary of rules
//TODO: bug: reply line not getting interpretted
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
        // else if (keyword == "pickRandom"){
        //     interpretedCode.push(createDictForPickRandom(blocks[i]));
        //     continue;
        // }
        else{
            rulesDict["keyword"] = keyword;  //gets the first keyword as keyword
        }

        let endloop = false;
        let j = 1;
        for (; j < words.length; j++){
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
            if (words[j].startsWith("{")) continue;
            responseStr += words[j] + " ";
        }
        rulesDict["response"].push(responseStr);
        interpretedCode.push(rulesDict);
    }
    
    return interpretedCode;

}


//returns true if arr contains ALL elements of target
//arr is the words in the input
//target is the words in dict
function contains_all(arr, target) {
    return (arr, target) => target.every(v => arr.includes(v));
}

//if the input has any of the NOT words, return true
//else return false
function chat_notAny(interpretedCode, input){
    inputArr = input.split(" ");

    for (let i = 0; i < interpretedCode.wordsNOT.length; i++){
        if (inputArr.includes(interpretedCode.wordsNOT[i])) return true;
    }
    
    return false;
}

//if the input has all of the NOT words, return true
//else return false
function chat_notAll(interpretedCode, input){
    inputArr = input.split(" ");
    return contains_all(inputArr, interpretedCode.wordsNOT);
}

function chat_ifAny(interpretedCode, input){
    for (let i = 0; i < interpretedCode.words.length; i++){
        if (input.includes(interpretedCode.words[i])){
            if ((interpretedCode.keywordNOT == "andNotAny" && (chat_notAny(interpretedCode, input))) ||
                (interpretedCode.keywordNOT == "andNotAll" && chat_notAll(interpretedCode, input))){
                return "";//don't respond yet 
            }
        }    
    }
    return interpretedCode.response;
}

function chat_ifAll(interpretedCode, input){
    inputArr = input.split(" ");
    if (contains_all(inputArr, interpretedCode.words)){
        if ((interpretedCode.keywordNOT == "andNotAny" && (chat_notAny(interpretedCode, input)))||
            (interpretedCode.keywordNOT == "andNotAll" && chat_notAll(interpretedCode, input))){
            return "";//don't respond yet 
        }
    }
    return interpretedCode.response;
}

function chat_pickRandom(interpretedCode, input){
    return;
}

//interpretedCode = rules dict mapping what we should say
function chat(interpretedCode, input){
    //depending on what interpretedCode.keyword is, we call different functions
    let response = "";
    switch(interpretedCode.keyword){
        case "ifAny":
            return chat_ifAny(interpretedCode, input);
        case "ifAll":
            return chat_ifAll(interpretedCode, input);
        case "pickRandom":
            return chat_pickRandom(interpretedCode, input);
    }

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
        // let i = 1;
        console.log(canonicalArray);
        let response = "";
        for (let i = 0; i < canonicalArray.length; i++){
            //take grammar out of input
            let input = document.getElementById("input").value;
            console.log(input);
            response = chat(canonicalArray[i], input);
            if(response != ""){
                break;
            }
        }
        console.log(response);
    })    

}
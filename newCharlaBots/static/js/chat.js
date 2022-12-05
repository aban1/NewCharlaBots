const newline = "(nw-ln)";;
const comment = "//"
//blocks is an array of strings. remove empty elements from array
function blocksHelper(blocks){
    let ret = [];
    for (let i = 0; i< blocks.length; i++){
        blocks[i] = blocks[i].trim();
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
    // console.log(lines)
    lines = lines.split(newline);
    let blocks = [];
    let blockString = "";

    for (let i = 0; i < lines.length; i++){
        let line = lines[i];

        let keyword = "";
        let pickRandomBlock = false;
        let startReplyBlock = false;

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
                else if (keyword == "startReply"){
                    startReplyBlock = true;
                }
            }
            //ignore comments
            if (j < line.length-1 && line[j] == "/" && line[j+1] == "/"){
                line = line.slice(0,j-1);
                break;
            }
        }
        if (pickRandomBlock){
            //for loop till end
            while(i < lines.length){
                blockString += lines[i] + " " + newline;
                i++;
            }
            blocks.push(blockString);
            //we have to be at the end 
            return blocksHelper(blocks);
        }
        else if (startReplyBlock){
            blockString += lines[i] + newline + " ";
            i++;
            while(i < lines.length){
                blockString += lines[i] + newline + " " ;
                i++;
                if (lines[i] == "{endIf}"){
                    blockString += lines[i];
                    blocks.push(blockString);
                    break;
                }
            }
            blockString = "";
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
//returns the keyword if found, false if not, empty string if start/end long response
function checkForKeyword(word){
    if (word[0] == "{" && word[word.length - 1] == "}"){
        return word.slice(1,-1)
    }
    //case where {keyword}(nw-ln)
    else if (word[0] == "{" && word[word.length - 1] == ")") return "long response";
    return false;
}

//removes comma and puts it in lower case
function removeComma(word){
    if (word[word.length - 1] == ","){
        word = word.slice(0,-1);
    }
    return word.toLowerCase();
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


    rulesDict["keyword"] ="pickRandom";


    responseArr = block.split(" " + newline);
    //remove first and last 2 elements of responseArr
    
    while (responseArr[responseArr.length - 1] == "" 
    || responseArr[responseArr.length - 1] == "{endPick}"){
    responseArr.pop();
}

    responseArr.shift();
    rulesDict["response"] = responseArr;
    return rulesDict;
}

function createDictForLongResponse(blocks){
    let rulesDict = {
        "keyword" : "",
        "words" : [],
        "keywordNOT": "",
        "wordsNOT": [],
        "response" : []
    };
    rulesDict["keyword"] ="startReply";
}

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
        //for every word remove capitalization and grammar
        for(let i = 0; i < words.length; i++){
            //words[i] = words[i].toLowerCase(); //TODO: should not tolowercase responses, just input words
            words[i] = words[i].replace(/[.,\/#!$%\^&\*;:=\_`~]/g,"")
        }

        let keyword = checkForKeyword(words[0]);
        //error checking
        if (keyword == false){
            alert("ERROR: no keyword at start, check code for assistance")
            return;
        }
        else if (keyword == "pickRandom"){
            interpretedCode.push(createDictForPickRandom(blocks[i]));
            continue;
        }
        else{
            rulesDict["keyword"] = keyword;  //gets the first keyword as keyword
        }

        let endloop = false;
        let j = 1;//don't delete, j is used outside of the for loop
        for (; j < words.length; j++){
            if (endloop == true){ break; }
            //while it's not a keyword, add word to "words"
            let innerKeyword = checkForKeyword(words[j]);
            if (!innerKeyword){
                rulesDict["words"].push(removeComma(words[j]).toLowerCase());
            }
            //it is a NOT keyword
            else if (innerKeyword.startsWith("and")){
                rulesDict["keywordNOT"] = checkForKeyword(words[j]);
                //loop through the not keywords
                for (j = j + 1; j<words.length; j++){
                    //if it IS a keyword, we are at the response, end the loop
                    if (!checkForKeyword(words[j])){                    
                        rulesDict["wordsNOT"].push(removeComma(words[j]).toLowerCase());
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
        //check if theres a start reply

        for (; j < words.length - 1; j++){
            if (words[j].startsWith("{")) continue;
            //if we see {stuff} delete it from words[j] (nw-ln){endif}
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
function contains_all(inputWords, listWords) {
    for (let i = 0; i < listWords.length; i++){
        if (!inputWords.includes(listWords[i])) return false;
    }
    return true;    
}

//if the input has any of the NOT words, return true
//else return false
function chat_notAny(interpretedCode, inputArr){
    for (let i = 0; i < interpretedCode.wordsNOT.length; i++){
        if (inputArr.includes(interpretedCode.wordsNOT[i])) return true;
    }
    return false;
}

//if the input has all of the NOT words, return true
//else return false
function chat_notAll(interpretedCode, inputArr){
    return contains_all(inputArr, interpretedCode.wordsNOT);
}


function chat_ifAny(interpretedCode, input){
    for (let i = 0; i < interpretedCode.words.length; i++){
        if (input.includes(interpretedCode.words[i])){
            if ((interpretedCode.keywordNOT == "andnotany" && (chat_notAny(interpretedCode, input))) ||
                (interpretedCode.keywordNOT == "andnotall" && chat_notAll(interpretedCode, input))){
                return "";//don't respond yet 
            }
            else {return interpretedCode.response;}
        }    
    }
    return "";
}

function chat_ifAll(interpretedCode, input){
    if (contains_all(input, interpretedCode.words)){
        //we have a NOT word, dont respond
        if ((interpretedCode.keywordNOT == "andnotany" && chat_notAny(interpretedCode, input))||
            (interpretedCode.keywordNOT == "andnotall" && chat_notAll(interpretedCode, input))){
            return "";//don't respond yet 
        }
        else{ 
            return interpretedCode.response;
        }
    }
    return "";
}

function chat_pickRandom(interpretedCode){
    //see how large response is, pick a random one
    let idx = Math.floor(Math.random() * interpretedCode.response.length);
    return interpretedCode.response[idx];
}

//interpretedCode = rules dict mapping what we should say
function chat(interpretedCode, input){
    //depending on what interpretedCode.keyword is, we call different functions
    input = input.toLowerCase();
    input = input.split(" ");
    switch(interpretedCode.keyword.toLowerCase()){
        case "ifany":
            return chat_ifAny(interpretedCode, input);
        case "ifall":
            return chat_ifAll(interpretedCode, input);
        case "pickrandom":
            return chat_pickRandom(interpretedCode);
        default:
            return "";
    }

}

//turns newline + " " into \n
function splitOnNewline(input){
    let responseArr = String(input).split(newline + " ");
    let output = "";
    for (let i = 0; i < responseArr.length - 1; i++){
        output += responseArr[i] + '\n';
    }
    output += responseArr[responseArr.length - 1];
    return output;
}

function eraseTextInput(){
    document.getElementById("input").value = "";
    document.getElementById("input").innerHTML = "";
}

function sendMessageHelper(canonicalCode){
    let blocks = getBlocks(canonicalCode);
    let canonicalArray = createCanonicalArray(blocks);
    
    let response = "";
    for (let i = 0; i < canonicalArray.length; i++){
        response = "";
        let input = document.getElementById("input").value;
        response = splitOnNewline(chat(canonicalArray[i], input));
        if(response != ""){
            // console.log( response);

            return response;
        }
    }
}

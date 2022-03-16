const newline = "fasldkjfnads";
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

//can't test without saving with comment functionality working
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
        blockString +=line + " ";

        if (keyword.startsWith("end")){
            isEnd = true;
            blocks.push(blockString);
            blockString = "";
        }
    }    
    console.log(blocks);
    return blocks;
}

function checkForKeyword(word){
    if (word[0] != "{" || word[word.length - 1] != "}") return false;
    else return word.slice(1,-1)
}

function createCanonicalArray(blocks){
    let interpretedCode = [];
    
    //one block no new lines
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
        if (keyword == false){
            console.log("error no keyword at start")
            return;
        }
        //gets the first keyword as keyword
        else{
            rulesDict["keyword"] = keyword;
        }
        let j = 1;
        let word = "";
        for (; j < words.length; j++){
            //while it's not a keyword, add word to "words"
            if (!checkForKeyword(words[j])){
                word = words[j];
                if (words[j][words[j].length-1] == ","){
                    word = words[j].slice(0,-1);
                }
                console.log(words[j])
                
                // if (words[j] == "{replyLine}"){
                //     console.log("inside reply line")
                //     console.log(checkForKeyword(words[j]))
                // }

                rulesDict["words"].push(word);
            }
            //it is a NOT keyword
            else if (checkForKeyword(words[j]).startsWith("and")){
                rulesDict["keywordNOT"] = checkForKeyword(words[j]);
                for (; j<words.length; j++){
                    let notWords = checkForKeyword(words[j]);
                    //if its a comma chop it off, 
                    if (!notWords){
                        rulesDict["wordsNOT"].push(words[j].slice(0,-1));
                    }
                }
                break;
            }
            else{ break; }
        }
        //everything else should be the response
        let responseStr = "";
        j++;
        for (; j < words.length - 1; j++){
            if (words[j].startsWith("{")) break;
            responseStr += words[j] + " ";
        }
        console.log(responseStr);
        console.log(rulesDict["response"])
        rulesDict["response"].push(responseStr);
        interpretedCode.push(rulesDict);
    }
    console.log(interpretedCode);
    return interpretedCode;
}

function sendMessage(){
    //fetch canonical code
    let botID = document.getElementById("botid").innerHTML;
    let url = "/getBotData/?botid=" + (botID).toString().trim();
        //put canonical code into array of dictionaries which include lists
    fetch(url, {})
        .then(response => response.json())
        .then((data) =>{
        let canonicalCode = data.data["canonical"];

        let blocks = getBlocks(canonicalCode);

        let canonicalArray = createCanonicalArray(blocks);    
    })    

}
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

//todo: not sure if this works anymore
//can't test without saving with comment functionality working
function getBlocks(lines){
    lines = lines.split("////");
    let blocks = [];
    let blockString = "";
    console.log(lines);
    for (let i = 0; i < lines.length; i++){
        let line = lines[i];
        console.log(line);
        if (line[0] == "#") continue;

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

            if (line[j] == "#"){
                line = line.slice(0,j-1);
                break;
            }
            // keyword = "";
        }
        blockString +=line;

        if (keyword.startsWith("end")){
            isEnd = true;
            blocks.push(blockString);
            blockString = "";
        }

    }

    return blocks;
}

function createCanonicalArray(canonicalCodeLines){
    let interpretedCode = []
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

        //break up into array of dicts
        let blocks = getBlocks(canonicalCode);

        // let canonicalArray = createCanonicalArray(canonicalCodeLines);    
        
    })    

}

let dict = {
    "keyword" : "",
    "words" : [],
    "keywordNOT": "",
    "wordsNOT": [],
    "response" : []
};
// let firstKeyword = "";
// let secondKeyword = "";

// let words = "";
// let wordsNOT = "";
// let line = canonicalCodeLines[i];
//loop through the line, look for first keyword
// for (j = 0; j < line.length; j++){    
//     if (line[j] == "{"){
//         j++;
//         for (; j< line.length; j++){
//             if (line[j] != "}"){
//                 firstKeyword +=line[j];
//             }
//             else{ break;}
//         }    
//     }
//     //continue looking in this line
//     if (line[j] != "{"){
//         words += line[j];
//     }
//     else if (line[j] == "{"){
//         //we are at the second keyword
//         j++;
//         for (; j < line.length; j++){
//             if (line[j] != "}"){
//                 secondKeyword +=line[j];
//             }
//             else{ break;}
//         }    
        
//     }
    //grab the remaining words

    //if keyword has reply in it


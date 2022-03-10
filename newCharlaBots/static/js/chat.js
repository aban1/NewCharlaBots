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

function getBlocks(lines){
    lines = lines.split("////");
    let blocks = [];
    let blockString = "";
    for (let i = 0; i < lines.length; i++){
        let line = lines[i];
        blockString +=line;


        for (let j = 0; j < line.length; j++){
            let keyword = "";

            if (line[j] == "{"){
                j++;

                for (; j< line.length; j++){
                    if (lines[j] != "}"){
                        keyword +=lines[j];
                    }
                    else{ break;}
                }
            }

            console.log(keyword);
            if (keyword.startsWith("end")){
                console.log("starts with end!!!!!")
                blocks.append(blockString);
                blockString = "";
            }
        }
    }
    console.log(blocks);
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


// create language 

function createLang(){
    var name = document.getElementById("langname").value;
    var ifAny = document.getElementById("ifAny").value;
    var andNotAny = document.getElementById("andNotAny").value;
    var ifAll = document.getElementById("ifAll").value;
    var andNotAll = document.getElementById("andNotAll").value;
    var replyLine = document.getElementById("replyLine").value;
    var startReply = document.getElementById("startReply").value;
    var endReply = document.getElementById("endReply").value;
    var endIf = document.getElementById("endIf").value;
    var pickRandom = document.getElementById("pickRandom").value;
    var endPick = document.getElementById("endPick").value;
    
    let getLangUrl = "/getAllLanguageNames/";
    fetch(getLangUrl, {})
        .then(response => response.json())
        .then((data) =>{
            
            let isNameMatch = false;

            //does not allow empty bot names
            if(name.length == 0){
                alert("Language Name can't be empty.")
            }

            else{

                //does not allow duplicate bot names
                for(let i = 0; i < data.data.length; i++){
                
                    if(name == data.data[i].name) {
    
                        alert("That language name is already taken, please choose another one")
                        isNameMatch = true;
                        break;
                    } 
                } 
    
                // adds new language to database
                if(!isNameMatch) {
                    
                    let url = "/createLang/?name="+ name + "&ifany="+ifAny + "&andnotany=" + andNotAny + "&ifall=" + ifAll + "&andnotall=" + 
                    andNotAll + "&replyline=" + replyLine + "&startreply=" + startReply + "&endreply=" + endReply + "&endif=" + endIf + "&pickrandom=" + pickRandom + "&endpick=" + endPick;
            
                fetch(url, {method: "POST"}).then(()=>{
                    alert("Language Created!")
                })
                    
                }
            }

           
    })

}



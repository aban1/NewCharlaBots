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
            console.log(data)
            let isNameMatch = false;
            for(let i = 0; i < data.data.length; i++){
                //TODO: when adding edit language functionality, make sure to not make duplicates
                if(name == data.data[i].name) {

                    alert("That language name is already taken, please choose another one")
                    isNameMatch = true;
                    break;
                } 
            } 

            if(!isNameMatch) {
                
                let url = "/createLang/?name="+ name + "&ifany="+ifAny + "&andnotany=" + andNotAny + "&ifall=" + ifAll + "&andnotall=" + 
                andNotAll + "&replyline=" + replyLine + "&startreply=" + startReply + "&endreply=" + endReply + "&endif=" + endIf + "&pickrandom=" + pickRandom + "&endpick=" + endPick;
        
            fetch(url, {method: "POST"}).then(()=>{
                alert("Language Created!")
            })
                
            }
           
    })

}



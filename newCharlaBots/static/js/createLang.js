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
    
    let url = "/createLang/?name="+ name + "&ifany="+ifAny + "&andnotany=" + andNotAny + "&ifall=" + ifAll + "&andnotall=" + 
        andNotAll + "&replyline=" + replyLine + "&startreply=" + startReply + "&endreply=" + endReply + "&endif=" + endIf + "&pickrandom=" + pickRandom + "&endpick=" + endPick;
    console.log(url);

    fetch(url, {method: "POST"});
    
}



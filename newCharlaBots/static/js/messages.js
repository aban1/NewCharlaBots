//array of messages sent by bot1/user and bot2
let bot1Messages = [];
let bot2Messages = [];

function updateMessages(message, botNum){
    if (botNum === 1){
        bot1Messages.push(message);
    }
    else if (botNum === 2){
        bot1Messages.push(message);
    }
}
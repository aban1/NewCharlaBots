import React from "react";
import PropTypes from "prop-types";


class Chat extends React.Component {
    constructor(props) {
      // Initialize mutable state
      super(props);
      this.state = { messages: [],};
      this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    componentDidMount() {
        // This line automatically assigns this.props.url to the const variable url
        const { messages } = this.props;

        texts = {yourText: document.getElementById("input").value,
        botText: response}
        const jsonuwu = JSON.stringify(texts);
        const sendStuff = {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: jsonuwu,
        };

        let botID = document.getElementById("botid").innerHTML;
        console.log(botID)
        let url = "/postChat/?botid=" + (botID).toString().trim();
        fetch(url, sendStuff)
        // Call REST API to get the post's information
        fetch(url, { credentials: "same-origin" })
          .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
          })
          .then((data) => {
            botText.push(data.botText)
            userText.push(data.userText)
            this.setState({
              messages: messages, 
            });
          })
          .catch((error) => console.log(error));
      }

      clearChat(){

        let botID = document.getElementById("botid").innerHTML;
    
        let url = "/postChat/?botid=" + (botID).toString().trim();
        fetch("/clearChat/?botid=" + (botID).toString().trim() )
    
    }

    render() {
        const { messages } = this.state;
        return (
          <div>
            <button onClick={this.clearChat}>Clear Chat</button>
            <div id = "Transcript">Conversation Transcript: 
                {messages.map((message) => (
                    message.isUser === 1?(
                        <div id="inputMessages">
                            <p>message.text</p>
                            <span id="name-right">From you</span>
                        </div>
                    ):
                    (
                    <div id="messages">
                        <p>message.text</p>
                        <span id="name-left">Bot chat</span>
                    </div>
                    )
              ))}
            </div>
          </div>

        );
      }
};

export default Chat;
import React from 'react';
import PropTypes from 'prop-types';
//import '/NewCharlaBots/style/form.css';

class Form extends React.Component {
  /* Display number of image and post owner of a single post */

  constructor(props) {
    // Initialize mutable state

    super(props);
    this.state = {

      options : [
        {text :'Chat with a Bot', key: 'button0'},
        {text :'Create a Bot', key: 'button1'},
        {text :'Edit a Bot', key: 'button2'},
        {text :'Have two Bots Chat', key: 'button3'},
        {text :'Create a Bot Language', key: 'button4'},
      ],

      action: '',
      botChosen: '',
      botLanguage: ''
     
    };


  

  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    const { url } = this.props;


  }



  // const handleSelection = (selection) => { 

  handleSelection(selection) {
    console.log("in handle selection" + selection)


    //chat with a bot
    if (selection == "button0"){
      console.log("in button0")

      const url = '/getAllBotNames/';
      fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

          let options = [];
          let bot = "bot";

          console.log(data)
          // for(int i = 0; i < data.)
          for (const index in data.data){
            options.push({text: data.data[index]["name"], key: bot + data.data[index]["key"]});
          }

        this.setState({
          options : options,
          action: 'chat'
        })
        //console.log(this.state)      
      })
    } 
    else if(selection == "button1" || selection == "button2"){
      const url = '/getAllLanguageNames/';
      fetch(url, {})
        .then(response => response.json())
        .then((data) =>{

          let options = [];
          let action = '';
          let button = "button";
          let key = '';
          let count = 5;

          console.log(data)

          for (const name in data.data){
            options.push({text: data.data[name], key: button + count});
            count ++;
          }

        if (selection == "button1"){
          action = 'create';
        }
        else if (selection == "button2"){
          action = 'edit';
        }

        this.setState({
          options : options,
          action: action
        })
        //console.log(this.state)      
      })
  }//button0-2

  //have 2 bots chat
  else if(selection == "button3" ){

     

  }

  //create language
  if(selection == "button4" ){

  }
}

  render() {
    // This line automatically assigns this.state.imgUrl to the const variable imgUrl
    // and this.state.owner to the const variable owner

  // let options = [
  //   {text :'Chat with a Bot', key: 'button0'},
  //   {text :'Create a Bot', key: 'button1'},
  //   {text :'Edit a Bot', key: 'button2'},
  //   {text :'Have two Bots Chat', key: 'button3'},
  //   {text :'Create a Bot Language', key: 'button4'},
  // ]


  //console.log(options)

  let allOptions = this.state.options.map((answerOption) => (

      <div key = {answerOption.key}>

      <button key = {answerOption.key} 
        style={{backgroundColor:'#F0F8FF'}}
        onClick={() => this.handleSelection(answerOption.key)}>
          {answerOption.text}</button> <br></br>
        
      </div>


    ));

    // Render number of post image and post owner
    return (

      <div> 

        <div>
          I want to: <br></br>

            {/*<button id="button0" onClick={this.handleSelection("0")}> Chat with a Bot </button> <br></br>
            <button id="button1" onClick={this.handleSelection("1")}> Create a Bot </button> <br></br>
            <button id="button2" onClick={this.handleSelection("2")}> Edit a Bot </button> <br></br>
            <button id="button3" onClick={this.handleSelection("3")}> Have two Bots Chat </button> <br></br>
            <button id="button4" onClick={this.handleSelection("4")}> Create a Bot Language </button> <br></br>*/}

            <div className='options'>
            {allOptions}
          </div>

        </div> 

        <br></br>

      </div>

    );
  }
}


export default Form;

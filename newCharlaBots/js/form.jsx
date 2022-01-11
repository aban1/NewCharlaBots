import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  /* Display number of image and post owner of a single post */
 
  


  constructor(props) {
    // Initialize mutable state

    



    super(props);
    this.state = {
     
    };

  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    const { url } = this.props;


  }



  // const handleSelection = (selection) => { 

  handleSelection(selection) {

    console.log(selection)

    // for(let i = 0; i < 5; i++){

    //   let button = document.getElementById("button" + i)



    //   button.style.color = 'gray'

    // }

    // let button = document.getElementById("button" + selection)

    // button.style.color = 'blue'


  }

  

  render() {
    // This line automatically assigns this.state.imgUrl to the const variable imgUrl
    // and this.state.owner to the const variable owner
        

  let options = [

    {text :'Chat with a Bot', key: 0},
    {text :'Create a Bot', key: 1},
    {text :'Edit a Bot', key: 2},
    {text :'Have two Bots Chat', key: 3},
    {text :'Create a Bot Language', key: 4},

  ]

  console.log(options)

   let allOptions = options.map((answerOption) => (
              <div>
              <button onClick={() => this.handleSelection(answerOption.key)}>{answerOption.text}</button> <br></br>
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

            <button> Next </button>
      </div>

    );
  }
}


export default Form;

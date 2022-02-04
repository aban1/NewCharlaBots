import React from 'react';
import PropTypes from 'prop-types';
//import '/NewCharlaBots/style/form.css';

class Editor extends React.Component {
  /* Display number of image and post owner of a single post */

  constructor(props) {
    // Initialize mutable state

    super(props)

    this.state = {}

    
  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    const { url } = this.props;
  }



 
  render() {
  // This line automatically assigns this.state.imgUrl to the const variable imgUrl
  // and this.state.owner to the const variable owner
 



    // Render number of post image and post owner
    return (

      <div> 
          editor
      </div>

    );
  }
}


export default Form;
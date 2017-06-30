import React from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
var $ = require('jquery');
import Dropzone from 'react-dropzone'

class CreateListing extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      cost: 0,
      tags: '',
      images: [],
      currentUserId: props.currentUserId
    };
  }


  //validate dats later
  // getValidationState() {
  //   //const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  // },

  handleChange(e) {

    // this.setState({
    //   name: $('#name').val(),
    //   description: $('#description').val(),
    //   cost: $('#cost').val(),
    //   tags: $('#tags').val(),
    //   images: $('#formControlsFile')[0].files
    // })
    var p = [];
    p.push($('#name').val());
    p.push($('#description').val());
    p.push($('#cost').val());
    p.push($('#tags').val());
    p.push(this.state.currentUserId);
    //p.push($('#formControlsFile')[0].files);
    this.postData(p);
  }

  postData(p) {

    // image stuff
    // var _data = new FormData();
    // var imagedata = document.querySelector('input[type="file"]').files[0];
    // //var imagedata = $('#formControlsFile')[0].files;
    // console.log(imagedata);
    // _data.append("data", imagedata);
    console.log('createlisting params',p);

    var state = this.state;
    $.ajax({

      url: '/createlisting',
      method: 'POST',
      dataType: 'json',
      data: {
        //'images': _data,
        'params': p},

      success: (data) => {

        console.log('success', data)
      },
      error: (err) => {
        console.log('error', err)
      }
    })

  }

  uploadFile(files) {
    let data = new FormData();
    data.append('image', files[0])

     $.ajax({
      url: '/createlistingimage',
      method: 'POST',
      processData: false,
      contentType: false,
      data: data,
      success: (data) => {
        console.log('success', data)
      },
      error: (err) => {
        console.log('error', err)
      } 
    })
  },


  render() {
    return (
      <form id='createListng'>
      <ControlLabel>Create a listing</ControlLabel>
        <FormGroup
          //controlId="formBasicText"
          //validationState={this.getValidationState()}
        >

           <Col componentClass={ControlLabel} sm={2}>
              <h3> Enter Name </h3>
            </Col>
          <FormControl
            type="text"
            //value={this.state.value}
            id='name'
            placeholder="Enter Name"
          />
            <Col componentClass={ControlLabel} sm={2}>
              <h3> Enter Description </h3>
            </Col>
          <FormControl
            type="text"
            id='description'
            //value={this.state.value}
            placeholder="Enter Description"
          />

          <Col componentClass={ControlLabel} sm={2}>
              <h3> Enter Cost </h3>
            </Col>
          <FormControl
            type="text"
            id='cost'
            //value={this.state.value}
            placeholder="Enter Cost"
          />
            <Col componentClass={ControlLabel} sm={2}>
               <h3> Add Images </h3>
            </Col>
        

            <Dropzone onDrop={this.uploadFile} name='image'/>

           <Col componentClass={ControlLabel} sm={2}>
              <h3> Enter Tags </h3>
            </Col>
          <FormControl
            type="text"
            id='tags'
            //value={this.state.value}
            placeholder="Enter Tags"
          />

        <Button onClick={this.handleChange.bind(this)}>Create</Button>

          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    );
  }
};


export default CreateListing

import React, { Component } from 'react';
import { createProject } from '../actions/issues';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { InputLabel, FormControl, Input } from '@material-ui/core';

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      author: '',
    };
  }
  handleFieldChange = (value, field) => {
    this.setState({
      [field]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('this.state', this.state);
    const { name, description, author } = this.state;
    if (name && description && author) {
      this.props.dispatch(
        createProject({
          Id: Math.round(Math.random() * 100),
          Name: name,
          Description: description,
          Author: author,
          Issues: [],
          LabelsList: [],
        })
      );
    }
  };
  render() {
    return (
      <div>
       
        <h3>Create Project form</h3>
        <FormControl>
          <InputLabel htmlFor='my-input'>Enter Project Title</InputLabel>
          <Input
            id='my-input'
            type='text'
            required
            onChange={(e) => this.handleFieldChange(e.target.value, 'name')}
            value={this.state.name}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor='my-input'>Enter description</InputLabel>
          <Input
            id='my-input'
            type='text'
            required
            onChange={(e) =>
              this.handleFieldChange(e.target.value, 'description')
            }
            value={this.state.description}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor='my-input'>Enter author</InputLabel>
          <Input
            id='my-input'
            type='text'
            required
            onChange={(e) => this.handleFieldChange(e.target.value, 'author')}
            value={this.state.author}
          />
        </FormControl>

        <Button
          variant='contained'
          color='primary'
          size='large'
          startIcon={<SaveIcon />}
          onClick={this.handleFormSubmit}
        >
          Save Project
        </Button>
      </div>
    );
  }
}

export default connect()(CreateProject);

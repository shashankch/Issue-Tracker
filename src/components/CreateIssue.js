import React, { Component } from 'react';
import { createIssue } from '../actions/issues';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { InputLabel, FormControl, Input } from '@material-ui/core';
import { connect } from 'react-redux';
class CreateIssue extends Component {
  componentDidMount() {
    let current = this.props.projects.filter(
      (proj) => proj.Id == this.props.match.params.id
    );

    this.setState({ currentProject: current[0] });
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      author: '',
      labels: [],
      currentProject: '',
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
    const { title, description, author, label } = this.state;
    if (title && description && author && label) {
      this.props.dispatch(
        createIssue(
          {
            number: Math.round(Math.random() * 1000),
            title: title,
            description: description,
            author: author,
            labels: [label, ...this.state.labels],
          },
          this.props.match.params.id
        )
      );
    }
  };
  render() {
    return (
      <div>
        <h3>Create Issue form</h3>
        <FormControl>
          <InputLabel htmlFor='my-input'>Enter Issue Title</InputLabel>
          <Input
            id='my-input'
            type='text'
            required
            onChange={(e) => this.handleFieldChange(e.target.value, 'title')}
            value={this.state.title}
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
            type='text'
            required
            onChange={(e) => this.handleFieldChange(e.target.value, 'author')}
            value={this.state.author}
            id='my-input'
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='my-input'>Enter label</InputLabel>
          <Input
            type='text'
            required
            onChange={(e) => this.handleFieldChange(e.target.value, 'label')}
            value={this.state.label}
            id='my-input'
          />
        </FormControl>
        <Button
          variant='contained'
          color='primary'
          size='large'
          startIcon={<SaveIcon />}
          onClick={this.handleFormSubmit}
        >
          Save Issue
        </Button>
      </div>
    );
  }
}

export default connect()(CreateIssue);

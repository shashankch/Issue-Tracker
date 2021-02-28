import React, { Component } from 'react';
import { createProject } from '../actions/issues';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { InputLabel, FormControl, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 545,
  },
  root2: {
    flexGrow: 1,
  },
  cardsMargin: {
    marginTop: 50,
  },
  btnMargin: {
    marginBottom: 20,
  },
});

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
        }),
      );
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root2} spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            justify='center'
            spacing={4}
            className={classes.cardsMargin}
          >
            <Box textAlign='center'>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    alt='Projects'
                    height='140'
                    image='https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                    title='Projects'
                  />
                  <CardContent>
                    <FormControl>
                      <InputLabel htmlFor='my-input'>
                        Enter Project Title
                      </InputLabel>
                      <Input
                        id='my-input'
                        type='text'
                        required
                        onChange={(e) =>
                          this.handleFieldChange(e.target.value, 'name')
                        }
                        value={this.state.name}
                      />
                    </FormControl>

                    <FormControl>
                      <InputLabel htmlFor='my-input'>
                        Enter description
                      </InputLabel>
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
                        onChange={(e) =>
                          this.handleFieldChange(e.target.value, 'author')
                        }
                        value={this.state.author}
                      />
                    </FormControl>
                  </CardContent>

                  <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    startIcon={<SaveIcon />}
                    onClick={this.handleFormSubmit}
                    className={classes.btnMargin}
                  >
                    Save Project
                  </Button>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const enhanced = connect()(CreateProject);
export default withStyles(useStyles)(enhanced);

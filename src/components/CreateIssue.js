import React, { Component } from 'react';
import { createIssue } from '../actions/issues';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { InputLabel, FormControl, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 190,
    maxWidth: 300,
  },

  root: {
    maxWidth: 345,
    maxHeight: 645,
  },
  root2: {
    flexGrow: 1,
  },
  cardsMargin: {
    marginTop: 20,
    marginBottom: 50,
  },
  btnMargin: {
    marginBottom: 20,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
class CreateIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      author: '',
      labels: [],
      newlabels: '',
      currentProject: '',
      open: false,
    };
  }

  componentDidMount() {
    console.log('params###', this.props.match.params.id);
    let current = this.props.projects.filter(
      (proj) => proj.Id == this.props.match.params.id,
    );
    console.log('current###', current);
    this.setState({ currentProject: current[0] });
  }
  getStyles(name, theme) {
    const { labels } = this.state;
    console.log('labels', labels);
    return {
      fontWeight: labels.includes(name)
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    };
  }

  handleChange = (event) => {
    this.setState({ labels: event.target.value });
    console.log('labels::', this.state.labels);
  };

  handleLabelChange = (value) => {
    this.setState({ newlabels: value });
  };

  handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.setState({ labels: value });
  };

  handleFieldChange = (value, field) => {
    this.setState({
      [field]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('this.state', this.state);
    const { title, description, author, labels, newlabels } = this.state;
    if (title && description && author) {
      this.props.dispatch(
        createIssue(
          {
            number: Math.round(Math.random() * 1000),
            title: title,
            description: description,
            author: author,
            labels: [newlabels, ...labels],
          },
          this.props.match.params.id,
          newlabels,
        ),
      );

      this.handleClickOpen();
      this.setState({
        title: '',
        description: '',
        author: '',
        newlabels: '',
        labels: [],
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, theme } = this.props;

    console.log('issue state', this.state);
    return (
      <Grid container className={classes.root2} spacing={2}>
        <Grid item xs={12}>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                New Issue Created !!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary' autoFocus>
                ok
              </Button>
            </DialogActions>
          </Dialog>
          <Box
            textAlign='center'
            m={1}
            fontWeight='fontWeightBold'
            fontSize={26}
            lineHeight={2}
          >
            {this.state.currentProject.Name}
          </Box>
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
                    image='https://images.unsplash.com/photo-1604307410297-081e0677d3fb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                    title='Projects'
                  />
                  <CardContent>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='my-input'>
                        Enter Issue Title
                      </InputLabel>
                      <Input
                        id='my-input'
                        type='text'
                        required
                        onChange={(e) =>
                          this.handleFieldChange(e.target.value, 'title')
                        }
                        value={this.state.title}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
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
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='my-input'>Enter author</InputLabel>
                      <Input
                        type='text'
                        required
                        onChange={(e) =>
                          this.handleFieldChange(e.target.value, 'author')
                        }
                        value={this.state.author}
                        id='my-input'
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor='my-input'>
                        Enter New label
                      </InputLabel>
                      <Input
                        type='text'
                        required
                        onChange={(e) => this.handleLabelChange(e.target.value)}
                        id='my-input'
                        value={this.state.newlabels}
                      />
                    </FormControl>
                    <Box className={classes.root2}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id='demo-mutiple-chip-label'>
                          Select existing labels
                        </InputLabel>
                        <Select
                          labelId='demo-mutiple-chip-label'
                          id='demo-mutiple-chip'
                          multiple
                          value={this.state.labels}
                          onChange={this.handleChange}
                          input={<Input id='select-multiple-chip' />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={value}
                                  className={classes.chip}
                                />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {this.state.currentProject.LabelsList &&
                            this.state.currentProject.LabelsList.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={this.getStyles(
                                  name,

                                  theme,
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </CardContent>

                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    startIcon={<SaveIcon />}
                    onClick={this.handleFormSubmit}
                    className={classes.btnMargin}
                  >
                    Save Issue
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

const enhancedIssue = connect()(CreateIssue);
export default withStyles(useStyles, { withTheme: true })(enhancedIssue);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
const useStyles = (theme) => ({
  root: {
    height: 350,
    width: 350,
    margin: 10,
  },
  root2: {
    flexGrow: 1,
  },
  addbtn: {
    marginTop: 10,
  },
  cardsMargin: {
    marginTop: 50,
  },
  controlsMargin: {
    marginRight: 10,
  },
});

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: '',
      currentIssue: '',
    };
  }

  componentDidMount() {
    let current = this.props.projects.filter(
      (proj) => proj.Id == this.props.match.params.id
    );

    this.setState({
      currentProject: current[0],
      currentIssue: current[0].Issues,
    });
  }
  componentWillUnmount() {
    this.setState({
      currentIssue: this.state.currentProject.Issues,
    });
  }

  sortByIssue = () => {
    let sorted = this.state.currentProject.Issues.sort((a, b) => {
      return a.number - b.number;
    });
    this.setState({
      currentIssue: sorted,
    });
  };

  searchByTitleAndDesc = (value) => {
    if (value.length > 0) {
      let filtered = this.state.currentProject.Issues.filter((a) => {
        return a.title === value || a.description === value;
      });
      this.setState({
        currentIssue: filtered,
      });
    } else {
      this.setState({
        currentIssue: this.state.currentProject.Issues,
      });
    }
  };

  filterByAuthor = (author) => {
    if (author.length > 0) {
      let filtered = this.state.currentProject.Issues.filter((a) => {
        return a.author === author;
      });
      this.setState({
        currentIssue: filtered,
      });
    } else {
      this.setState({
        currentIssue: this.state.currentProject.Issues,
      });
    }
  };
  filterByLabels = () => {
    //TODO...
  };
  render(props) {
    console.log('Name', this.state.currentProject);
    const { Id } = this.state.currentProject;
    const { classes } = this.props;

    return (
      <Grid container className={classes.root2} spacing={2}>
        <Grid item xs={12}>
        <Box
            textAlign='center'
            m={1}
            fontWeight='fontWeightBold'
            fontSize={26}
            lineHeight={3}
          >
            {this.state.currentProject.Name}
          </Box>
          <Grid
            container
            justify='center'
            spacing={4}
            className={classes.addbtn}
          >
            <Link to={`/create-issue/${Id}`}>
              <Fab color='primary' aria-label='add' variant='extended'>
                <AddIcon /> Add Issue
              </Fab>
            </Link>
          </Grid>

          
          <Box
            textAlign='center'
            m={1}
            fontWeight='fontWeightBold'
            fontSize={22}
            lineHeight={4}
          >
            Active Issues
          </Box>
          <Grid
            container
            justify='center'
            spacing={4}
           
          >
            <Fab
              color='primary'
              aria-label='add'
              variant='extended'
              onClick={this.sortByIssue}
              className={classes.controlsMargin}
            >
              Sort By Issue
            </Fab>

            <Fab
              color='primary'
              aria-label='add'
              variant='extended'
              onClick={this.filterByLabels}
              className={classes.controlsMargin}
            >
              Filter By Label
            </Fab>

            <TextField
              id='outlined-basic'
              label='Search By Author'
              variant='outlined'
              type='text'
              placeholder='Enter Author'
              required
              onChange={(e) => this.filterByAuthor(e.target.value)}
              className={classes.controlsMargin}
            />
            <TextField
              id='outlined-basic'
              label='By Title and description'
              variant='outlined'
              type='text'
              placeholder='Enter'
              required
              onChange={(e) => this.searchByTitleAndDesc(e.target.value)}
            />
          </Grid>

          <Grid
            container
            justify='center'
            spacing={4}
            className={classes.cardsMargin}
          >
            {this.state.currentIssue &&
              this.state.currentIssue.map((issue, index) => {
                return (
                  <Card className={classes.root} key={index}>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        alt='Contemplative Reptile'
                        height='200'
                        image='https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80https://images.unsplash.com/photo-1613929905911-96040610a54d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'
                        title='Contemplative Reptile'
                      />
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {issue.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {issue.author}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {issue.description}
                          {issue.number}

                          {issue.createdAt}
                          {issue.labels}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(ProjectDetails);

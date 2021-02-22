import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
  root: {
    height: 350,
    width: 350,
    margin: 10,
  },
  root2: {
    flexGrow: 1,
  },
  addbtn: {
    marginTop: 20,
  },
});

function Home(props) {
  const classes = useStyles();
  const { projects } = props;
  console.log('this->', props);
  return (
    <Grid container className={classes.root2} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={4} className={classes.addbtn}>
          <Link to='/create-project'>
            <Fab color='primary' aria-label='add' variant='extended'>
              <AddIcon /> Add Project
            </Fab>
          </Link>
        </Grid>
        <Box
          textAlign='center'
          m={1}
          fontWeight='fontWeightBold'
          fontSize={26}
          lineHeight={3}
        >
          All Projects
        </Box>

        <Grid container justify='center' spacing={4}>
          {projects &&
            projects.map((project) => {
              return (
                <Card className={classes.root} key={project.Id}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      alt='Contemplative Reptile'
                      height='200'
                      image='https://images.unsplash.com/photo-1613929905911-96040610a54d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'
                      title='Contemplative Reptile'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        <Link to={`/project/${project.Id}`} key={project.Id}>
                          {project.Name}
                        </Link>
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        Author: {project.Author}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        Description: {project.Description}
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

export default Home;

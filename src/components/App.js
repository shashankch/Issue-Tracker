import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import ProjectDetails from './ProjectDetails';
import CreateProject from './CreateProject';
import React from 'react';
import CreateIssue from './CreateIssue';
class App extends React.Component {
  render(props) {
    const { Projects } = this.props.Projects;
    console.log('prj', Projects);
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => {
                return <Home {...props} projects={Projects} />;
              }}
            />

            <Route
              path='/project/:id'
              render={(props) => {
                return <ProjectDetails {...props} projects={Projects} />;
              }}
            />
            <Route path='/create-project' component={CreateProject} />
            <Route
              path='/create-issue/:id'
              render={(props) => {
                return <CreateIssue {...props} projects={Projects} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    Projects: state.issues,
  };
}

export default connect(mapStateToProps)(App);

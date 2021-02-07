import React, { Component } from 'react';
import { connect } from 'react-redux';
class Home extends Component {
  render(props) {
    const { Projects } = this.props;
    return (
      <div>
        <div>
          <button>Add Projects</button>
        </div>
        <h3>List of Projects: </h3>
        <div>
          {Projects.map((project, index) => {
            return (
              <div>
                {project.Id}-{project.Name}-{project.Description}-
                {project.Author}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    Projects: state.issues,
  };
}

export default connect(mapStateToProps)(Home);

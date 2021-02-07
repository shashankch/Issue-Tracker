import {} from '../actions/actionTypes';
import data from '../data.json';
// initial goal state
const ProjectsInitialState = data;

export function issues(state = ProjectsInitialState, action) {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return state.push(action.project);
    case 'CREATE_ISSUE':
      const Project = state.filter((project) => project.id === action.id);
      Project.Issues.push(action.issue);
      return [...state, Project];
    default:
      return state;
  }
}

import { CREATE_PROJECT, CREATE_ISSUE } from '../actions/actionTypes';
import data from '../data.json';
// initial goal state
const initialState = {
  Projects: data,
};

export function issues(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      console.log('state', data);
      return {
        ...state,
        Projects: [action.project, ...state.Projects],
      };

    case CREATE_ISSUE:
      console.log('state333', state);
      let result = state.Projects.filter(
        (proj) => parseInt(proj.Id) === parseInt(action.id),
      );
      console.log('stat555e', result[0].Issues);
      let iss = result[0].Issues;
      result[0].LabelsList.push(action.list);
      iss.push(action.issue);
      return {
        ...state,
      };
    default:
      return state;
  }
}
// return {
//   ...state,
//   Projects: [result, ...state.Projects],
// };

import { CREATE_PROJECT, CREATE_ISSUE } from './actionTypes';

export function createProject(project) {
  return {
    type: CREATE_PROJECT,
    project,
  };
}
export function createIssue(issue, id, list) {
  return {
    type: CREATE_ISSUE,
    issue,
    id,
    list,
  };
}

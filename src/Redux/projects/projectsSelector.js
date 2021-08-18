
export const selectGetProjectsState = state => state;

export const selectProjectList = state => selectGetProjectsState(state).projects;


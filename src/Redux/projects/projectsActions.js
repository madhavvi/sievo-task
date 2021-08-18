export const Types = {
    GET_PROJECTS_REQUEST: 'projects/GET_PROJECTS_REQUEST',
    GET_PROJECTS_SUCCESS: 'projects/GET_PROJECTS_SUCCESS',
    GET_PROJECTS_ERROR: 'projects/GET_PROJECTS_ERROR'
}

export const getProjects = () => ({
    type: Types.GET_PROJECTS_REQUEST
})

export const getProjectsSuccess = ({projects}) => ({
    type: Types.GET_PROJECTS_SUCCESS,
    payload: {
        projects: projects
    }
})

export const getProjectsError = ({error}) => ({
    type: Types.GET_PROJECTS_ERROR,
    payload: {
        error
    }
});


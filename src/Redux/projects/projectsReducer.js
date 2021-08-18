import { Types } from './projectsActions';

const INITIAL_STATE = {
    projects: {},
};

export default function getProjects(state = INITIAL_STATE, action){
    switch(action.type){
        case Types.GET_PROJECTS_REQUEST: {
            return {
                ...state,
                projects: action?.payload?.projects,
                loading: true,
            }
        }

        case Types.GET_PROJECTS_SUCCESS: {
            return {
                ...state,
                projects: action?.payload?.projects,
                loading: false,
            }
        }

        case Types.GET_PROJECTS_ERROR: {
            return {
                ...state,
                error: action?.payload?.error
            }
        }

        default: {
            return state;
        }
    }
}
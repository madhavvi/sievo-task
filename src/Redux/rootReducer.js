import { combineReducers } from 'redux';
import projectsReducer from './projects/projectsReducer';

 export default combineReducers({
    projects: projectsReducer
});
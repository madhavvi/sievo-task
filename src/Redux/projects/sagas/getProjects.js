import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from '../projectsActions';
import * as api from '../../../Utils/Api';

function* getProjects() {
    try {
        const result = yield call(api.getProjectList);
        yield put(actions.getProjectsSuccess({
			projects: result.data
		}));
    } catch (e) {
        yield put(actions.getProjectsError({
            error: 'An error occurred when trying to fetch project list'
        }));
    }
}

function* watchGetProjectsRequest() {
    yield takeEvery(actions.Types.GET_PROJECTS_REQUEST, getProjects);
}

const GetProjectsSagas = [
    fork(watchGetProjectsRequest)
]

export default GetProjectsSagas;
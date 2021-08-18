import GetProjectsSagas from './projects/sagas/getProjects';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...GetProjectsSagas,
    ])
}
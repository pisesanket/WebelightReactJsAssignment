import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  fetchReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
  fetchRepoDetailsRequest,
  fetchRepoDetailsSuccess,
  fetchRepoDetailsFailure,
} from "./reposSlice";
import { getDateBasedOnPeriod } from "../utils/dateUtils";

function* fetchReposSaga(action) {
  try {
    const { period, page } = action.payload;
    const date = getDateBasedOnPeriod(period);
    const response = yield call(
      axios.get,
      `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`
    );
    yield put(fetchReposSuccess(response.data.items));
  } catch (error) {
    yield put(fetchReposFailure(error.message));
  }
}

function* fetchRepoDetailsSaga(action) {
  try {
    const { owner, repo } = action.payload;
    const [commitActivity, codeFrequency, contributors] = yield all([
      call(
        axios.get,
        `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
      ),
      call(
        axios.get,
        `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`
      ),
      call(
        axios.get,
        `https://api.github.com/repos/${owner}/${repo}/stats/contributors`
      ),
    ]);

    yield put(
      fetchRepoDetailsSuccess({
        commitActivity: commitActivity.data,
        codeFrequency: codeFrequency.data,
        contributors: contributors.data,
      })
    );
  } catch (error) {
    yield put(fetchRepoDetailsFailure(error.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchReposRequest.type, fetchReposSaga);
  yield takeLatest(fetchRepoDetailsRequest.type, fetchRepoDetailsSaga);
}

export default rootSaga;

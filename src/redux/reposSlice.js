// reposSlice.js
import { createSlice } from "@reduxjs/toolkit";

const reposSlice = createSlice({
  name: "repos",
  initialState: {
    repos: [],
    repoDetails: null,
    selectedRepo: null,
    loading: false,
    error: null,
    repoDetailsError: null,
    currentPage: 1,
    hasMore: true,
  },
  reducers: {
    fetchReposRequest: (state, action) => {
      state.loading = true;
      if (action.payload.page === 1) {
        state.repos = [];
      }
    },
    fetchReposSuccess: (state, action) => {
      state.repos = [...state.repos, ...action.payload];
      state.loading = false;
      state.currentPage += 1;
      state.hasMore = action.payload.length > 0;
    },
    fetchReposFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchRepoDetailsRequest: (state, action) => {
      state.loading = true;
      state.repoDetailsError = false;
    },
    fetchRepoDetailsSuccess: (state, action) => {
      state.repoDetails = action.payload;
      state.loading = false;
    },
    fetchRepoDetailsFailure: (state, action) => {
      state.repoDetailsError = action.payload;
      state.loading = false;
    },
    selectRepo: (state, action) => {
      state.selectedRepo = action.payload;
      state.repoDetails = null;
    },
    resetRepos: (state) => {
      state.repos = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
});

export const {
  fetchReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
  fetchRepoDetailsRequest,
  fetchRepoDetailsSuccess,
  fetchRepoDetailsFailure,
  selectRepo,
  resetRepos,
} = reposSlice.actions;

export default reposSlice.reducer;

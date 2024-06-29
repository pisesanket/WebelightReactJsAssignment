import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReposRequest, selectRepo, resetRepos } from "../redux/reposSlice";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import RepoDetails from "./RepoDetails";

const RepoList = () => {
  const dispatch = useDispatch();
  const { repos, selectedRepo, loading, error, currentPage, hasMore } =
    useSelector((state) => state.repos);
  const [period, setPeriod] = useState("1_week");

  useEffect(() => {
    dispatch(resetRepos());
    dispatch(fetchReposRequest({ period, page: 1 }));
  }, [dispatch, period]);

  const handleRepoClick = (repo) => {
    dispatch(selectRepo(repo.id === selectedRepo?.id ? null : repo));
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore && !loading) {
      dispatch(fetchReposRequest({ period, page: currentPage + 1 }));
    }
  };

  return (
    <div onScroll={handleScroll} className="repo-list">
      <Select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "16px" }}
      >
        <MenuItem value="1_week">Last 1 Week</MenuItem>
        <MenuItem value="2_weeks">Last 2 Weeks</MenuItem>
        <MenuItem value="1_month">Last 1 Month</MenuItem>
      </Select>
      <List>
        {repos?.map((repo) => (
          <ListItem key={repo?.id} className="repo-item">
            <div className="repo-text">
              <Avatar src={repo?.owner.avatar_url} />
              <ListItemText
                primary={repo?.name}
                secondary={`Stars: ${repo?.stargazers_count} | Issues: ${repo?.open_issues_count} | Owner: ${repo?.owner.login}`}
              />
              <Button onClick={() => handleRepoClick(repo)}>
                {repo?.id === selectedRepo?.id ? (
                  <ExpandMoreIcon />
                ) : (
                  <ArrowForwardIosIcon />
                )}
              </Button>
            </div>
            {selectedRepo && repo?.id === selectedRepo?.id && (
              <div className="repo-details">
                <RepoDetails
                  owner={selectedRepo?.owner?.login}
                  repo={selectedRepo?.name}
                />
              </div>
            )}
          </ListItem>
        ))}
      </List>
      {loading && <CircularProgress />}
      {!hasMore && <div>Looks like you have reached the end!</div>}
    </div>
  );
};

export default RepoList;

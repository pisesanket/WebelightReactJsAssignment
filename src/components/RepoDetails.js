import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepoDetailsRequest } from "../redux/reposSlice";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { CircularProgress, Typography } from "@mui/material";

const RepoDetails = ({ owner, repo }) => {
  const dispatch = useDispatch();
  const { repoDetails, loading, error } = useSelector((state) => state.repos);

  useEffect(() => {
    dispatch(fetchRepoDetailsRequest({ owner, repo }));
  }, [dispatch, owner, repo]);

  useEffect(() => {
    if (repoDetails) {
      console.log("Repo Details:", repoDetails);
    }
  }, [repoDetails]);

  if (loading) return <CircularProgress />;

  if (!repoDetails) return <Typography>No data available</Typography>;

  const commitActivityOptions = {
    title: {
      text: "Total Changes",
    },
    series: [
      {
        name: "commits",
        data: Array.isArray(repoDetails?.commitActivity)
          ? repoDetails?.commitActivity
          : [],
      },
    ],
  };

  const codeFrequencyData = Array.isArray(repoDetails?.codeFrequency)
    ? repoDetails?.codeFrequency
    : [];

  const codeFrequencyOptions = {
    title: {
      text: "Contributor Changes",
    },
    series: [
      {
        name: "Additions",
        data: codeFrequencyData?.map((frequency) => frequency[1] || 0),
      },
      {
        name: "Deletions",
        data: codeFrequencyData?.map((frequency) => frequency[2] || 0),
      },
    ],
  };

  return (
    <>
      <div>
        {!repoDetails && <Typography>No data available</Typography>}
        <HighchartsReact
          highcharts={Highcharts}
          options={commitActivityOptions}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={codeFrequencyOptions}
        />
      </div>
    </>
  );
};

export default RepoDetails;

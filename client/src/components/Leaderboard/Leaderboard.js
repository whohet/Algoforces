import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";

import useToast from "../../customHooks/useToast/useToast";
import Loading from "../utils/Loading/Loading";

import { getGlobalLeaderboardAPI } from "../../api/problem";

import TableContainer from "../Problem/ProblemSubmissions/TableContainer";

import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, ToastContainer] = useToast();

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        // accessor: (_row, i) => i + 1,
        Cell: ({ row, flatRows }) => {
          return flatRows.indexOf(row) + 1;
        },
      },
      {
        Header: "Username",
        accessor: "username",
        disableFilters: true,
      },
      {
        Header: "Solved Count",
        accessor: "stats.solvedCount",
        disableFilters: true,
      },
    ],
    []
  );

  const fetchGlobalLeaderboard = async () => {
    const res = await getGlobalLeaderboardAPI();
    if (res.success) {
      setLeaderboard(res.leaderboard);
    } else {
      const errorMessage =
        res.message || "Can't fetch leaderboard. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGlobalLeaderboard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="leaderboard-container">
        <div className="leaderboard-table-container">
          <Container>
            <TableContainer columns={columns} data={leaderboard} />
          </Container>
        </div>
      </div>
      {ToastContainer}
    </>
  );
}

export default Leaderboard;

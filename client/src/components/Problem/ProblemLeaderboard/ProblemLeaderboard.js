import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserContext from "../../../context/UserContext";

import useToast from "../../../customHooks/useToast/useToast";
import Loading from "../../utils/Loading/Loading";

import { getProblemLeaderboardAPI } from "../../../api/problem";
import { AVAILABLE_LANGUAGES } from "../data";

import SeeCodeModal from "../ProblemSubmissions/SeeCodeModal";
import TableContainer from "../ProblemSubmissions/TableContainer";

function ProblemLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState({
    languageLabel: "C++",
    code: "",
  });
  const [showCodeModal, setShowCodeModal] = useState(false);

  const userContext = useContext(UserContext);
  const params = useParams();
  const [toast, ToastContainer] = useToast();

  const onShowCodeButtonClick = (submission) => {
    setSelectedSubmission(submission);
    setShowCodeModal(true);
  };

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
        Header: "Language",
        accessor: "languageLabel",
        disableFilters: true,
      },
      {
        Header: "Time",
        accessor: "time",
        disableFilters: true,
      },
      {
        Header: "Memory",
        accessor: "memory",
        disableFilters: true,
      },
      {
        Header: "Verdict",
        accessor: "verdict",
        disableFilters: true,
      },
      {
        Header: "Codes",
        accessor: "code",
        disableFilters: true,
        Cell: ({ cell }) => (
          <Button onClick={() => onShowCodeButtonClick(cell.row.values)}>
            See Code
          </Button>
        ),
      },
    ],
    []
  );

  const fetchProblemLeaderboard = async () => {
    const data = {
      problemId: params.problemId,
    };
    const res = await getProblemLeaderboardAPI(data);
    if (res.success) {
      let leaderboard = res.leaderboard;
      for (let i = 0; i < leaderboard.length; i++) {
        leaderboard[i].languageLabel = AVAILABLE_LANGUAGES.find(
          (language) => leaderboard[i].language == language.value
        ).label;
      }
      setLeaderboard(leaderboard);
    } else {
      const errorMessage =
        res.message || "Can't fetch leaderboard. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProblemLeaderboard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <Container>
          <TableContainer columns={columns} data={leaderboard} />
        </Container>
      </div>
      {ToastContainer}
      {showCodeModal && (
        <SeeCodeModal
          code={selectedSubmission.code}
          languageLabel={selectedSubmission.languageLabel}
          showCodeModal={showCodeModal}
          setShowCodeModal={setShowCodeModal}
        />
      )}
    </>
  );
}

export default ProblemLeaderboard;

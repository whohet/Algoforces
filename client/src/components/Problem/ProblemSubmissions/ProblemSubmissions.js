import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserContext from "../../../context/UserContext";

import useToast from "../../../customHooks/useToast/useToast";
import Loading from "../../utils/Loading/Loading";

import { getSubmissionsListAPI } from "../../../api/problem";
import { AVAILABLE_LANGUAGES } from "../data";

import SeeCodeModal from "./SeeCodeModal";
import TableContainer from "./TableContainer";

function ProblemSubmissions() {
  const [submissionsList, setSubmissionsList] = useState([]);
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

  const fetchSubmissionsList = async () => {
    const data = {
      username: userContext.userData.username,
      problemId: params.problemId,
    };
    const res = await getSubmissionsListAPI(data);
    if (res.success) {
      let submissions = res.submissionsList;
      for (let i = 0; i < submissions.length; i++) {
        submissions[i].languageLabel = AVAILABLE_LANGUAGES.find(
          (language) => submissions[i].language == language.value
        ).label;
      }
      setSubmissionsList(submissions);
    } else {
      const errorMessage =
        res.message || "Can't fetch submissions list. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userContext.isAuthenticated) {
      fetchSubmissionsList();
    } else {
      setSubmissionsList([]);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <Container>
          <TableContainer columns={columns} data={submissionsList} />
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

export default ProblemSubmissions;

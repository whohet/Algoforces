import { useEffect, useMemo, useState } from "react";

import { getProblemsListAPI } from "../../api/problems";

import { Container } from "react-bootstrap";
import TableContainer from "./TableContainer";
import {
  ProblemNameFilter,
  DifficultyFilter,
  TagsFilter,
  filterProblemsUsingTag,
} from "./ColumnFilters";

import Loading from "../utils/Loading/Loading";
import useToast from "../../customHooks/useToast/useToast";

import "./Problemset.css";

function Problemset() {
  const [problemsList, setProblemsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toast, ToastContainer] = useToast();

  const columns = useMemo(
    () => [
      {
        Header: "Problem Id",
        accessor: "problemId",
        disableFilters: true,
      },
      {
        Header: "Problem name",
        accessor: "problemName",
        Filter: ProblemNameFilter,
        filter: "text",
      },
      {
        Header: "Difficulty",
        accessor: "published.config.difficulty.label",
        Filter: DifficultyFilter,
        filter: "text",
      },
      {
        Header: "Acceptance",
        accessor: "acceptance",
        disableFilters: true,
      },
      {
        Header: "Solve",
        accessor: "solve",
        disableFilters: true,
      },
      {
        disableFilters: false,
        Header: "Tags",
        accessor: (data) => {
          return "";
        },
        Filter: TagsFilter,
        filter: filterProblemsUsingTag,
      },
    ],
    []
  );

  const fetchProblemList = async () => {
    const res = await getProblemsListAPI();
    if (res.success) {
      setProblemsList(res.problemsList);
    } else {
      const errorMessage =
        res.message || "Can't fetch problem list. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProblemList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="problemset-full">
        <div className="problemset-container">
          {/* <h2>Problemset</h2> */}
          <Container>
            <TableContainer columns={columns} data={problemsList} />
          </Container>
        </div>
      </div>
      {ToastContainer}
    </>
  );
}

export default Problemset;

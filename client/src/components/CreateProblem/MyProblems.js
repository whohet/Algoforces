import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import CreateProblemModal from "./CreateProblemModal";
import { Table, Button } from "react-bootstrap";
import "./MyProblems.css";

import { getMyProblemsAPI } from "../../api/problemCreationApi";

function MyProblems() {
  const [problems, setProblems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const fetchProblems = async () => {
    const res = await getMyProblemsAPI();
    if (res.success) {
      setProblems(res.problems);
    }
  };
  const createProblem = () => {
    setShowModal(true);
  };
  const editProblem = (index) => {
    const problemId = problems[index]._id;
    history.push(`/edit/${problemId}`);
  };
  useEffect(() => {
    fetchProblems();
  }, []);
  return (
    <>
      <div className="my-problems-full">
        <div className="my-problems-container">
          <div className="create-problem-button">
            <Button variant="success" onClick={createProblem}>
              Create Problem
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Problem Id</th>
                <th style={{ width: "60%" }}>Problem Name</th>
                <th style={{ width: "20%" }}>#</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => {
                return (
                  <tr key={index}>
                    <td>{problem.problemId || "-"}</td>
                    <td>{problem.problemName}</td>
                    <td>
                      <Button
                        variant="primary"
                        style={{ width: "80px" }}
                        onClick={(e) => editProblem(index)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <CreateProblemModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default MyProblems;

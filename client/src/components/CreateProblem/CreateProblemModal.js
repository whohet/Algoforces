import { useState } from "react";
import { useHistory } from "react-router";

import { Modal, Button } from "react-bootstrap";
import useLoader from "../../customHooks/useLoader/useLoader";
import useToast from "../../customHooks/useToast/useToast";

import { createProblemAPI } from "../../api/problemCreationApi";
import "./MyProblems.css";

function CreateProblemModal({ showModal, setShowModal }) {
  const [problemName, setProblemName] = useState("");

  const [toast, ToastContainer] = useToast();
  const [loader, showLoader, hideLoader] = useLoader();
  const history = useHistory();

  const handleClose = () => setShowModal(false);
  const handleProblemName = (e) => setProblemName(e.target.value);

  const createProblem = async () => {
    showLoader();
    const res = await createProblemAPI({ problemName: problemName });
    if (res.success) {
      history.push(`/edit/${res._id}`);
    } else {
      const errorMessage =
        res.message || "Internal server error. Please try again";
      toast.error(errorMessage);
    }
    hideLoader();
  };

  return (
    <div>
      <>
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Problem</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="create-problem-form">
              <div className="problem-name">
                <label htmlFor="problem-name-input">Problem Name: </label>
                <input
                  type="text"
                  name="problemMame"
                  id="problem-name-input"
                  value={problemName}
                  onChange={handleProblemName}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={createProblem}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {loader}
      {ToastContainer}
    </div>
  );
}

export default CreateProblemModal;

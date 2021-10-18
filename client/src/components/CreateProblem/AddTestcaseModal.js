import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useLoader from "../../customHooks/useLoader/useLoader";
import useToast from "../../customHooks/useToast/useToast";

import "./CreateProblem.css";

function AddTestcaseModal({ show, setShow, testcases, setTestcases }) {
  const [inputFile, setInputFile] = useState(null);
  const [outputFile, setOutputFile] = useState(null);
  const [isSample, setIsSample] = useState(false);

  const [toast, ToastContainer] = useToast();
  const [loader, showLoader, hideLoader] = useLoader();

  const handleClose = () => setShow(false);
  const handleInputFile = (e) => setInputFile(e.target.files[0]);
  const handleOutputFile = (e) => setOutputFile(e.target.files[0]);
  const handleIsSample = (e) => setIsSample(!isSample);

  const addTestcase = async () => {
    if (!inputFile) {
      toast.error("Please select input file.", { autoClose: 5000 });
      return;
    }
    if (!outputFile) {
      toast.error("Please select output file.", { autoClose: 5000 });
      return;
    }

    showLoader();
    try {
      const res = {};
      setTestcases([
        ...testcases,
        {
          id: testcases.length + 1,
          input: {
            link: res.inputURL || "https://www.algoforces.me/input_file_not_found",
            fileName: inputFile.name,
          },
          output: {
            link: res.outputURL || "https://www.algoforces.me/input_file_not_found",
            fileName: outputFile.name,
          },
          isSample: isSample,
        },
      ]);
      setInputFile(null);
      setOutputFile(null);

      hideLoader();
      handleClose();
    } catch (err) {}
    hideLoader();
  };

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Testcase</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="add-testcase-form">
              <label htmlFor="add-testcase-input-file">Input File: </label>
              <div className="add-testcase-input">
                <p>{inputFile && inputFile.name ? inputFile.name : "Drag your files here or click in this area."}</p>
                <input type="file" name="outputFile" id="add-testcase-input-file" onChange={handleInputFile} />
              </div>
              <label htmlFor="add-testcase-output-file">Output File: </label>
              <div className="add-testcase-output">
                <p>{outputFile && outputFile.name ? outputFile.name : "Drag your files here or click in this area."}</p>
                <input type="file" name="inputFile" id="add-testcase-output-file" onChange={handleOutputFile} />
              </div>
              <div className="add-testcase-is-sample">
                <input
                  type="checkbox"
                  name="isSample"
                  id="add-testcase-is-sample-input"
                  checked={isSample}
                  onChange={handleIsSample}
                />
                <label htmlFor="add-testcase-is-sample-input">&nbsp;Sample Testcase</label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addTestcase}>
              Upload and Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {loader}
      {ToastContainer}
    </div>
  );
}

export default AddTestcaseModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Problem.css";

import CEIcon from "../../../src/assets/ce.png";
import ACIcon from "../../../src/assets/ac.png";
import WAIcon from "../../../src/assets/wa.png";
import REIcon from "../../../src/assets/re.png";
import TLEIcon from "../../../src/assets/tle.png";
import MLEIcon from "../../../src/assets/mle.png";

function VerdictModal({ verdict, showVerdictModal, setShowVerdictModal }) {
  const handleClose = () => setShowVerdictModal(false);

  return (
    <>
      <div>
        <Modal
          show={showVerdictModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Verdict</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="verdict-container align-center">
              <div className="verdict-icon">
                {verdict.name === "ce" && (
                  <img
                    alt="compilation error icon"
                    src={CEIcon}
                    height="80"
                    className="d-inline-block align-center"
                  />
                )}
                {verdict.name === "ac" && (
                  <img
                    alt="accepted icon"
                    src={ACIcon}
                    height="80"
                    className="d-inline-block align-center"
                  />
                )}
                {verdict.name === "wa" && (
                  <img
                    alt="wrong answer icon"
                    src={WAIcon}
                    height="80"
                    className="d-inline-block align-center"
                  />
                )}
                {verdict.name === "re" && (
                  <img
                    alt="runtime error icon"
                    src={REIcon}
                    height="80"
                    className="d-inline-block align-center"
                  />
                )}
                {verdict.name === "tle" && (
                  <img
                    alt="time limit icon"
                    src={TLEIcon}
                    height="80"
                    className="d-inline-block align-center"
                  />
                )}
                {verdict.name === "mle" && (
                  <img
                    alt="memory limit icon"
                    src={MLEIcon}
                    height="80"
                    className="d-inline-block align-center"
                  />
                )}
              </div>
              <div className={`verdict-label verdict-label-${verdict.name}`}>
                {verdict.label}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default VerdictModal;

import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useToast from "../../../customHooks/useToast/useToast";
import CodeEditor from "../CodeEditor/CodeEditor";
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_PREFERENCE,
  LANGUAGE_DATA,
} from "../data";

import "../Problem.css";

function SeeCodeModal({
  code,
  languageLabel,
  showCodeModal,
  setShowCodeModal,
}) {
  const [codes, setCodes] = useState(LANGUAGE_DATA);
  const [preferences, setPreferences] = useState({
    ...DEFAULT_PREFERENCE,
    language: AVAILABLE_LANGUAGES.find(
      (languagData) => languageLabel === languagData.label
    ).value,
    disabled: true,
  });

  const [toast, ToastContainer] = useToast();

  useEffect(() => {
    const newCodes = { ...codes };
    const languageValue = AVAILABLE_LANGUAGES.find(
      (languagData) => languageLabel === languagData.label
    ).value;
    newCodes[languageValue].code = code;
    setCodes(newCodes);
  }, [code, languageLabel]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied successfully.");
  };
  const handleClose = () => setShowCodeModal(false);

  return (
    <>
      <div>
        <Modal
          show={showCodeModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="sm"
          dialogClassName="see-code-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="edit-problem-checker-code">
                <div className="edit-problem-checker-code-editor">
                  {showCodeModal && (
                    <CodeEditor
                      codes={codes}
                      setCodes={setCodes}
                      preferences={preferences}
                    />
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={copyCode}>Copy Code</Button>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {ToastContainer}
    </>
  );
}

export default SeeCodeModal;

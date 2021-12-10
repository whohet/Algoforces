import React from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";

import { AVAILABLE_THEMES } from "./data";

import "./Problem.css";

function PreferencesModal({
  preferences,
  setPreferences,
  showPreferencesModal,
  setShowPreferencesModal,
}) {
  const handleClose = () => setShowPreferencesModal(false);

  return (
    <>
      <div>
        <Modal
          show={showPreferencesModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Preferences</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="preferences-all">
              <div className="preferences-item-container">
                <div>Theme: </div>
                <Select
                  value={preferences.theme}
                  options={AVAILABLE_THEMES}
                  name="select-theme"
                  onChange={(theme) => {
                    setPreferences({
                      ...preferences,
                      theme: theme,
                    });
                  }}
                />
              </div>
              {/* <div className="preferences-item-container">
                <div>Font size: </div>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={preferences.fontSize}
                  id="select-font-size"
                  onChange={(e) => {
                    setPreferences({
                      ...preferences,
                      fontSize: e.target.value,
                    });
                  }}
                />
              </div> */}

              <div className="preferences-item-container">
                <div>Tab size: </div>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={preferences.tabSize}
                  id="select-tab-size"
                  onChange={(e) => {
                    setPreferences({
                      ...preferences,
                      tabSize: e.target.value,
                    });
                  }}
                />
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

export default PreferencesModal;

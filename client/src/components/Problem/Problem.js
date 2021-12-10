import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

import Split from "react-split";
import CodeEditor from "./CodeEditor/CodeEditor";
import DisplayProblem from "./DisplayProblem/DisplayProblem";
import ProblemLeaderboard from "./ProblemLeaderboard/ProblemLeaderboard";
import ProblemSubmissions from "./ProblemSubmissions/ProblemSubmissions";
import Select from "react-select";

import { Button, Tab, Tabs } from "react-bootstrap";
import useLoader from "../../customHooks/useLoader/useLoader";
import useToast from "../../customHooks/useToast/useToast";

import { getPreferencesAPI, getProblemDataAPI } from "../../api/problem";

import "./Problem.css";
import "./SplitPaneStyles.css";
import {
  AVAILABLE_LANGUAGES,
  AVAILABLE_THEMES,
  DEFAULT_PREFERENCE,
  LANGUAGE_DATA,
} from "./data";
import PreferencesModal from "./PreferencesModal";

function Problem() {
  const PROBLEM_PAGE_TABS_NAME = ["submissions", "leaderboard"];
  const getValidTabName = (tabName) =>
    PROBLEM_PAGE_TABS_NAME.includes(tabName) ? tabName : "description";

  const params = useParams();
  const [activeTab, setActiveTab] = useState(getValidTabName(params.activeTab));
  const [problem, setProblem] = useState(null);
  const [isProblemLoaded, setIsProblemLoaded] = useState(false);
  const [codes, setCodes] = useState(LANGUAGE_DATA);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCE);

  const [toast, ToastContainer] = useToast();
  const [loader, showLoader, hideLoader] = useLoader();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  useEffect(() => {
    const fetchProblemData = async () => {
      const problemId = params.problemId;
      const res = await getProblemDataAPI(problemId);
      if (res.success) {
        setProblem(res.problem);
      } else {
        const errorMessage =
          res.message || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
      setIsProblemLoaded(true);
    };

    const getPreferences = async () => {
      const res = await getPreferencesAPI();
      if (res.success) {
        const theme = AVAILABLE_THEMES.find(
          (theme) => theme.value === res.preferences.theme
        );
        setPreferences({ ...res.preferences, theme: theme });
      } else {
      }
    };
    getPreferences();
    fetchProblemData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  const handleTabChange = (k) => {
    const newTabName = k === "description" ? "" : k;
    history.push(`/problem/${params.problemId}/${newTabName}`);
  };

  useEffect(() => {
    setActiveTab(getValidTabName(params.activeTab));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <div className="problem-page-full">
        <Split className="split" minSize={0} snapOffset={300} gutterSize={14}>
          <div className="problem-page-left-side">
            <Tabs
              id="problem-page-tabs"
              activeKey={activeTab}
              onSelect={(k) => handleTabChange(k)}
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                <DisplayProblem
                  problem={problem}
                  isProblemLoaded={isProblemLoaded}
                />
              </Tab>
              <Tab eventKey="submissions" title="Submissions">
                <ProblemSubmissions />
              </Tab>
              <Tab eventKey="leaderboard" title="Leaderboard">
                <ProblemLeaderboard />
              </Tab>
            </Tabs>
          </div>
          <div className="problem-page-right-side">
            <div className="code-editor-config">
              <div className="select-language-container">
                <Select
                  value={{
                    value: preferences.language,
                    label: codes[preferences.language].label,
                  }}
                  options={AVAILABLE_LANGUAGES}
                  name="select-language"
                  onChange={(language) => {
                    setPreferences({
                      ...preferences,
                      language: language.value,
                    });
                  }}
                />
              </div>
              <div>
                <Button
                  variant="secondary"
                  onClick={() => setShowPreferencesModal(true)}
                >
                  Preferences
                </Button>
              </div>
            </div>
            <div className="code-editor-container">
              <CodeEditor
                codes={codes}
                setCodes={setCodes}
                preferences={preferences}
              />
            </div>
            <div className="code-runner-container">
              <div className="code-runner-left">
                <Button variant="primary">Custom test</Button>
              </div>
              <div className="code-runner-right">
                <div className="run-code-button">
                  <Button variant="primary">Run</Button>
                </div>
                <div className="submit-code-button">
                  <Button variant="success">Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </Split>
      </div>
      {loader}
      {ToastContainer}
      <PreferencesModal
        preferences={preferences}
        setPreferences={setPreferences}
        showPreferencesModal={showPreferencesModal}
        setShowPreferencesModal={setShowPreferencesModal}
      />
    </>
  );
}

export default Problem;

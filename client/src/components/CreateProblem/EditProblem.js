import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Table } from "react-bootstrap";
import Select from "react-select";
import Loading from "../utils/Loading/Loading";
import RichTextEditor from "../utils/RichTextEditor/RichTextEditor";
import AddTestcaseModal from "./AddTestcaseModal";

import {
  getProblemDataAPI,
  saveAndPublishProblemAPI,
  saveProblemAPI,
} from "../../api/problemCreationApi";
import "./EditProblem.css";

import { PROBLEM_TAGS } from "../../data/problemTags";
import { PROBLEM_DIFFICULTIES } from "../../data/problemDifficulties";
import useToast from "../../customHooks/useToast/useToast";
import useLoader from "../../customHooks/useLoader/useLoader";
import CodeEditor from "../Problem/CodeEditor/CodeEditor";

import { DEFAULT_PREFERENCE, CPP_DATA } from "../Problem/data";

function CreateProblem() {
  const [problemId, setProblemId] = useState(null);
  const [problemName, setProblemName] = useState("");
  const [statement, setStatement] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [constraints, setConstrains] = useState("");
  const [testcases, setTestcases] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [config, setConfig] = useState({});

  // Checker code editor
  const [codes, setCodes] = useState({ cpp: CPP_DATA });
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCE);

  const [toast, ToastContainer] = useToast();
  const [loader, showLoader, hideLoader] = useLoader();
  const [showTestcaseModal, setShowTestcaseModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  // const sample_data = {
  //   problemName: "Add two numbers",
  //   statement: `
  //     You are given two number <b>a</b> and <b>b</b>. Find the sum of two numbers.
  //   `,
  //   inputFormat: `
  //     You will be given <b>two</b> space seprated integers on first line.
  //   `,
  //   outputFormat: `
  //     You need to print integer which is sum of given two integers.
  //   `,
  //   constraints: `

  //   `,
  //   testcases: [
  //     {
  //       input: {
  //         url: "https://www.algoforces.me/input1",
  //         fileName: "Input1.txt",
  //       },
  //       output: {
  //         url: "https://www.algoforces.me/output1",
  //         fileName: "Output1.txt",
  //       },
  //       isSample: true,
  //     },
  //     {
  //       input: {
  //         url: "https://www.algoforces.me/input2",
  //         fileName: "Input2.txt",
  //       },
  //       output: {
  //         url: "https://www.algoforces.me/output2",
  //         fileName: "Output2.txt",
  //       },
  //       isSample: false,
  //     },
  //     {
  //       input: {
  //         url: "https://www.algoforces.me/input3",
  //         fileName: "Input1.txt",
  //       },
  //       output: {
  //         url: "https://www.algoforces.me/output3",
  //         fileName: "Output3.txt",
  //       },
  //       isSample: false,
  //     },
  //   ],
  //   explanation: `
  //     In first sample test case, first values is <b>3</b> and second is <b>5</b>. So sum is <b>8</b>
  //   `,
  //   config: {
  //     timelimit: 1000,
  //     memorylimit: 256,
  //     difficulty: { value: 1, label: "Easy" },
  //     tags: [{ value: "hashing", label: "Hashing" }],
  //   },
  // };

  const getProblemData = async () => {
    const res = await getProblemDataAPI({ _id: params.id });
    if (res.success) {
      if (res.problem.problemId) {
        setProblemId(res.problem.problemId);
      }
      setProblemName(res.problem.problemName);

      const problem = res.problem.saved;
      const checkerCode = { ...codes };
      if (problem.checkerCode) {
        checkerCode.cpp.code = problem.checkerCode;
        setCodes(checkerCode);
      }
      setStatement(problem.statement);
      setInputFormat(problem.inputFormat);
      setOutputFormat(problem.outputFormat);
      setConstrains(problem.constraints);
      setTestcases(problem.testcases);
      setExplanation(problem.explanation);
      setConfig(problem.config);
    } else {
      const errorMessage =
        res.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  const handleConfigChange = (e) => {
    const newConfig = { ...config };
    newConfig[e.target.name] = parseInt(e.target.value);
    setConfig(newConfig);
  };

  const handleSampleTestcase = (e) => {
    const index = e.target.name;
    const newTestcases = [...testcases];
    newTestcases[index].isSample = !newTestcases[index].isSample;
    setTestcases([...newTestcases]);
  };

  const deleteTestcase = (e) => {
    const deleteIndex = parseInt(e.target.name);
    if (
      window.confirm(
        `Are you sure you want to delete testcase #${deleteIndex + 1}?`
      )
    ) {
      const newTestcases = testcases.filter(
        (testcase, index) => index !== deleteIndex
      );
      setTestcases(newTestcases);
    }
  };

  const saveProblem = async () => {
    showLoader();
    const problem = {
      statement,
      inputFormat,
      outputFormat,
      constraints,
      testcases,
      checkerCode: codes.cpp.code,
      explanation,
      config,
    };
    const res = await saveProblemAPI({ _id: params.id, problemName, problem });
    if (res.success) {
      toast.success("Problem saved successfully");
    } else {
      const errorMessage =
        res.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
    hideLoader();
  };

  const saveAndPublishProblem = async () => {
    showLoader();
    const problem = {
      statement,
      inputFormat,
      outputFormat,
      constraints,
      testcases,
      checkerCode: codes.cpp.code,
      explanation,
      config,
    };
    const res = await saveAndPublishProblemAPI({
      _id: params.id,
      problemName,
      problem,
    });
    if (res.success) {
      setProblemId(res.problemId);
      toast.success("Problem saved and pubished successfully");
    } else {
      const errorMessage =
        res.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
    hideLoader();
  };

  useEffect(() => {
    getProblemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="edit-problem-full">
        <div className="edit-problem-container">
          <div className="edit-problem-title">Create Problem</div>

          <div className="edit-problem-name">
            <div className="edit-problem-headers">Problem Id</div>
            <input type="text" value={problemId || "-"} disabled={true} />
          </div>

          <div className="edit-problem-name">
            <div className="edit-problem-headers">Problem Name</div>
            <input
              type="text"
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
            />
          </div>

          <div className="edit-problem-statement">
            <div className="edit-problem-headers">Problem Statement</div>
            <RichTextEditor
              data={statement}
              setData={setStatement}
              placeholder="Enter problem statement here..."
            />
          </div>

          <div className="edit-problem-input">
            <div className="edit-problem-headers">Input Format</div>
            <RichTextEditor
              data={inputFormat}
              setData={setInputFormat}
              placeholder="Enter input format here..."
            />
          </div>
          <div className="edit-problem-output">
            <div className="edit-problem-headers">Output Format</div>
            <RichTextEditor
              data={outputFormat}
              setData={setOutputFormat}
              placeholder="Enter output format here..."
            />
          </div>

          <div className="edit-problem-constraints">
            <div className="edit-problem-headers">Constrains</div>
            <RichTextEditor
              data={constraints}
              setData={setConstrains}
              placeholder="Enter constraints here..."
            />
          </div>

          <div className="edit-problem-testcase">
            <div className="edit-problem-headers">Testcases</div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Input</th>
                  <th>Output</th>
                  <th>Is sample testcase</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {testcases.map((testcase, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <a
                          href={testcase.input.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {testcase.input.fileName}
                        </a>
                      </td>
                      <td>
                        <a
                          href={testcase.output.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {testcase.output.fileName}
                        </a>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name={index}
                          checked={testcase.isSample}
                          onChange={handleSampleTestcase}
                        />
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          name={index}
                          onClick={deleteTestcase}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Button
              variant="primary"
              className="edit-problem-add-testcase"
              onClick={() => setShowTestcaseModal(!showTestcaseModal)}
            >
              Add Testcase
            </Button>
          </div>
          <div className="edit-problem-checker-code">
            <div className="edit-problem-checker-code-editor">
              <div className="edit-problem-headers">Checker Code: </div>
              <CodeEditor
                codes={codes}
                setCodes={setCodes}
                preferences={preferences}
              />
            </div>
          </div>

          <div className="edit-problem-explanation">
            <div className="edit-problem-headers">Sample Explanation</div>
            <RichTextEditor
              data={explanation}
              setData={setExplanation}
              placeholder="Enter sameple testcase explanation here..."
            />
          </div>

          <div className="edit-problem-config">
            <div className="edit-problem-config-time">
              <div className="edit-problem-headers">
                Time Limit(in milliseconds):{" "}
              </div>
              <input
                type="number"
                name="timelimit"
                min="100"
                max="5000"
                value={config.timelimit}
                onChange={handleConfigChange}
              />
            </div>

            <div className="edit-problem-config-memory">
              <div className="edit-problem-headers">Memory Limit(in MB): </div>
              <input
                type="number"
                name="memorylimit"
                min="32"
                max="2048"
                value={config.memorylimit}
                onChange={handleConfigChange}
              />
            </div>

            <div className="edit-problem-config-difficulty">
              <div className="edit-problem-headers">Difficulty</div>
              <Select
                value={config.difficulty}
                options={PROBLEM_DIFFICULTIES}
                name="difficulty"
                onChange={(value) =>
                  setConfig({ ...config, difficulty: value })
                }
              />
            </div>

            <div className="edit-problem-config-tags">
              <div className="edit-problem-headers">Tags</div>
              <Select
                value={config.tags}
                options={PROBLEM_TAGS}
                isMulti={true}
                isClearable={true}
                name="tags"
                onChange={(value) => setConfig({ ...config, tags: value })}
              />
            </div>
          </div>
          <div className="edit-problem-buttons">
            <Button
              variant="success"
              className="edit-problem-save"
              onClick={saveProblem}
            >
              Save
            </Button>
            <Button
              variant="success"
              className="edit-problem-publish"
              onClick={saveAndPublishProblem}
            >
              Save and Publish
            </Button>
          </div>
        </div>
      </div>
      <AddTestcaseModal
        testcases={testcases}
        setTestcases={setTestcases}
        show={showTestcaseModal}
        setShow={setShowTestcaseModal}
      />
      {loader}
      {ToastContainer}
    </>
  );
}

export default CreateProblem;

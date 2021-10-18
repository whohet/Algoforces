import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Select from "react-select";

import Loading from "../utils/Loading/Loading";
import RichTextEditor from "../utils/RichTextEditor/RichTextEditor";
import AddTestcaseModal from "./AddTestcaseModal";

import "./CreateProblem.css";

import { problemTags } from "../../data/problemTags";
import { problemDifficulty } from "../../data/problemDifficulty";

function CreateProblem() {
  const [problemName, setProblemName] = useState("");
  const [statement, setStatement] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [constrains, setConstrains] = useState("");
  const [testcases, setTestcases] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [config, setConfig] = useState({});

  const [showTestcaseModal, setShowTestcaseModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const sample_data = {
    problemName: "Add two numbers",
    statement: `
      You are given two number <b>a</b> and <b>b</b>. Find the sum of two numbers.
    `,
    inputFormat: `
      You will be given <b>two</b> space seprated integers on first line.
    `,
    outputFormat: `
      You need to print integer which is sum of given two integers.
    `,
    constrains: `

    `,
    testcases: [
      {
        id: 1,
        input: {
          link: "https://www.algoforces.me/input1",
          fileName: "Input1.txt",
        },
        output: {
          link: "https://www.algoforces.me/output1",
          fileName: "Output1.txt",
        },
        isSample: true,
      },
      {
        id: 2,
        input: {
          link: "https://www.algoforces.me/input2",
          fileName: "Input2.txt",
        },
        output: {
          link: "https://www.algoforces.me/output2",
          fileName: "Output2.txt",
        },
        isSample: false,
      },
      {
        id: 3,
        input: {
          link: "https://www.algoforces.me/input3",
          fileName: "Input1.txt",
        },
        output: {
          link: "https://www.algoforces.me/output3",
          fileName: "Output3.txt",
        },
        isSample: false,
      },
    ],
    explanation: `
      In first sample test case, first values is <b>3</b> and second is <b>5</b>. So sum is <b>8</b>
    `,
    config: {
      timeLimit: 1000,
      memoryLimit: 256,
      difficulty: { value: 1, label: "Easy" },
      tags: [{ value: "hashing", label: "Hashing" }],
    },
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
    if (window.confirm(`Are you sure you want to delete testcase #${deleteIndex + 1}?`)) {
      let newTestcases = testcases.filter((testcase, index) => index !== deleteIndex);
      for (let i = 0; i < newTestcases.length; i++) {
        newTestcases[i].id = i + 1;
      }
      setTestcases(newTestcases);
    }
  };

  const getProblemData = async () => {
    const res = sample_data;
    setProblemName(res.problemName);
    setStatement(res.statement);
    setInputFormat(res.inputFormat);
    setOutputFormat(res.outputFormat);
    setConstrains(res.constrains);
    setTestcases(res.testcases);
    setExplanation(res.explanation);
    setConfig(res.config);

    setLoading(false);
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
      <div className="create-problem-full">
        <div className="create-problem-container">
          <div className="create-problem-title">Create Problem</div>

          <div className="create-problem-name">
            <div className="create-problem-headers">Problem Name</div>
            <input type="text" value={problemName} onChange={(e) => setProblemName(e.target.value)} />
          </div>

          <div className="create-problem-statement">
            <div className="create-problem-headers">Problem Statement</div>
            <RichTextEditor data={statement} setData={setStatement} placeholder="Enter problem statement here..." />
          </div>

          <div className="create-problem-input">
            <div className="create-problem-headers">Input Format</div>
            <RichTextEditor data={inputFormat} setData={setInputFormat} placeholder="Enter input format here..." />
          </div>
          <div className="create-problem-output">
            <div className="create-problem-headers">Output Format</div>
            <RichTextEditor data={outputFormat} setData={setOutputFormat} placeholder="Enter output format here..." />
          </div>

          <div className="create-problem-constrains">
            <div className="create-problem-headers">Constrains</div>
            <RichTextEditor data={constrains} setData={setConstrains} placeholder="Enter constrains here..." />
          </div>

          <div className="create-problem-testcase">
            <div className="create-problem-headers">Testcases</div>
            {testcases.length === 0 ? (
              <div>Please add testcases by clicking "Add Testcase" button</div>
            ) : (
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
                          <a href={testcase.input.link} target="_blank" rel="noreferrer">
                            {testcase.input.fileName}
                          </a>
                        </td>
                        <td>
                          <a href={testcase.output.link} target="_blank" rel="noreferrer">
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
                          <Button variant="danger" name={index} onClick={deleteTestcase}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}

            <Button
              variant="primary"
              className="create-problem-add-testcase"
              onClick={() => setShowTestcaseModal(!showTestcaseModal)}
            >
              Add Testcase
            </Button>
          </div>

          <div className="create-problem-explanation">
            <div className="create-problem-headers">Sample Explanation</div>
            <RichTextEditor
              data={explanation}
              setData={setExplanation}
              placeholder="Enter sameple testcase explanation here..."
            />
          </div>

          <div className="create-problem-config">
            <div className="create-problem-config-time">
              <div className="create-problem-headers">Time Limit(in milliseconds): </div>
              <input
                type="number"
                name="timeLimit"
                min="100"
                max="5000"
                value={config.timeLimit}
                onChange={handleConfigChange}
              />
            </div>

            <div className="create-problem-config-memory">
              <div className="create-problem-headers">Memory Limit(in MB): </div>
              <input
                type="number"
                name="memoryLimit"
                min="32"
                max="2048"
                value={config.memoryLimit}
                onChange={handleConfigChange}
              />
            </div>

            <div className="create-problem-config-difficulty">
              <div className="create-problem-headers">Difficulty</div>
              <Select
                value={config.difficulty}
                options={problemDifficulty}
                name="difficulty"
                onChange={(value) => setConfig({ ...config, difficulty: value })}
              />
            </div>

            <div className="create-problem-config-tags">
              <div className="create-problem-headers">Tags</div>
              <Select
                value={config.tags}
                options={problemTags}
                isMulti={true}
                isClearable={true}
                name="tags"
                onChange={(value) => setConfig({ ...config, tags: value })}
              />
            </div>
          </div>
          <div className="create-problem-buttons">
            <Button variant="success" className="create-problem-save">
              Save
            </Button>
            <Button variant="success" className="create-problem-publish">
              Publish
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
    </>
  );
}

export default CreateProblem;

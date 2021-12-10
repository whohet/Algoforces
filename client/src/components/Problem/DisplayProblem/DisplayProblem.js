import React from "react";
import Error from "../../utils/Error/Error";
import Loading from "../../utils/Loading/Loading";

import "./DisplayProblem.css";
import "./CKEditorStyles.css";

function DisplayProblem({ problem, isProblemLoaded }) {
  const createMarkup = (htmlCode) => {
    return { __html: htmlCode };
  };

  const copyText = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
  };

  if (!isProblemLoaded) {
    return <Loading />;
  }
  // problem Data has been fetched still problem state is null, then it means something went wrong :(
  if (isProblemLoaded && !problem) {
    return <Error />;
  }
  
  return (
    <div className="display-problem-container">
      <div className="problem-name">
        {problem.problemId}. {problem.problemName}
      </div>
      <hr />
      <div className="problem-limits">
        <div
          className={`problem-difficulty-${problem.published.config.difficulty.label}`}
        >
          {problem.published.config.difficulty.label}
        </div>
        <div className="time-limit">
          Time limit: {problem.published.config.timelimit}ms
        </div>
        <div className="memory-limit">
          Memory limit: {problem.published.config.memorylimit} MB
        </div>
      </div>
      <hr />
      <div
        dangerouslySetInnerHTML={createMarkup(problem.published.statement)}
        className="problem-statement ck-content"
      ></div>
      <div className="input-format-container">
        <div className="input-format-header display-problem-subheader">
          Input Format
        </div>
        <div
          dangerouslySetInnerHTML={createMarkup(problem.published.inputFormat)}
          className="input-format ck-content"
        />
      </div>
      <div className="output-format-container">
        <div className="output-format-header display-problem-subheader">
          Output Format
        </div>
        <div
          dangerouslySetInnerHTML={createMarkup(problem.published.outputFormat)}
          className="output-format ck-content"
        />
      </div>
      <div className="constraints-container">
        <div className="constraints-header display-problem-subheader">
          Constraints
        </div>
        <div
          dangerouslySetInnerHTML={createMarkup(problem.published.constraints)}
          className="constraints ck-content"
        />
      </div>

      <div className="sample-testcase-all">
        {problem.published.sampleTestcases.map((testcase, index) => {
          return (
            <div key={index} className="sample-testcase-container">
              <hr id="sample-testcase-horizontal-rule" />
              {/* <div className="sample-testcase-header">Example {index + 1}</div> */}
              <div className="sample-testcase-input-output">
                <span className=" display-problem-subheader">
                  Sample Input {index + 1}
                </span>
                <button
                  className="copy-button"
                  onClick={() => copyText(testcase.input)}
                >
                  Copy
                </button>
                <div className="input-output-content">
                  <pre>{testcase.input.trim()}</pre>
                </div>
                <span className=" display-problem-subheader">
                  Sample Output {index + 1}
                </span>
                <button
                  className="copy-button"
                  onClick={() => copyText(testcase.output)}
                >
                  Copy
                </button>
                <div className="input-output-content">
                  <pre>{testcase.output.trim()}</pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="explanation-container">
        <div className="explanation-header display-problem-subheader">
          Explanation
        </div>
        <div
          dangerouslySetInnerHTML={createMarkup(problem.published.explanation)}
          className="explanation ck-content"
        />
      </div>
    </div>
  );
}

export default DisplayProblem;

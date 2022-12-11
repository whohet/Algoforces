import { useRef, useEffect, useState } from "react";
import AceEditor from "react-ace";

import "./CodeEditor.css";

import { AVAILABLE_LANGUAGES, AVAILABLE_THEMES } from "../data";
import "ace-builds/src-min-noconflict/ext-language_tools";

AVAILABLE_LANGUAGES.forEach((lang) => {
  const language = lang.value === "cpp" ? "c_cpp" : lang.value;
  require(`ace-builds/src-min-noconflict/mode-${language}`);
  require(`ace-builds/src-min-noconflict/snippets/${language}`);
});

AVAILABLE_THEMES.forEach((theme) =>
  require(`ace-builds/src-min-noconflict/theme-${theme.value}`)
);

function CodeEditor({ preferences, codes, setCodes }) {
  const editorRef = useRef();
  const [codesState, setCodesState] = useState(codes);
  const onLoad = (e) => {};
  const onChange = (e) => {
    if (preferences.disabled) {
      return;
    }
    const language = preferences.language;
    const newCodes = { ...codes };
    newCodes[language].code = e;
    setCodes(newCodes);
  };

  useEffect(() => {
    editorRef.current.editor.resize();
  }, []);

  useEffect(() => {
    setCodesState(codes);
  }, [codes, preferences]);

  return (
    <div className="code-editor">
      <AceEditor
        ref={editorRef}
        placeholder="Write your code here..."
        mode={preferences.language === "cpp" ? "c_cpp" : preferences.language}
        theme={preferences.theme.value}
        name="code-editor-22"
        onLoad={onLoad}
        onChange={onChange}
        width="100%"
        height="100%"
        fontSize={preferences.fontSize}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={false}
        wrapEnabled={true}
        indentedSoftWrap={false}
        value={codesState[preferences.language].code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: preferences.tabSize,
        }}
        readOnly={preferences.disabled || false}
      />
    </div>
  );
}

export default CodeEditor;

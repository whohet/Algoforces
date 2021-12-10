import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function RichTextEditor({ data, setData, ...props }) {
  const config = {
    placeholder: props.placeholder || "Enter your text here",
  };
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={config}
        onReady={(editor) => {
        }}
        onChange={(event, editor) => {
          const newData = editor.getData();
          setData(newData);
        }}
      />
    </div>
  );
}

export default RichTextEditor;

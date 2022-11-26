/*
Rich Text Editor V4
created using CKEditor 4. Almost all needed features(mathtype not included)
Package needed:
-> @ckeditor/ckeditor5-react 
-> ckeditor5-custom-build-onlinejudge (For custome build without mathtype)
*/

// import { CKEditor } from "ckeditor4-react";

// function RichTextEditor({ data, setData, ...props }) {
//   /*
//   Toolbar Configuration generated using "Toolbar Configurator" tool provided by CKEditor
//   https://ckeditor.com/latest/samples/toolbarconfigurator/index.html#basic
//   */
//   const config = {
//     placeholder: props.placeholder || "Enter your text here",
//     toolbarGroups: [
//       { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
//       {
//         name: "paragraph",
//         groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
//       },
//       { name: "links", groups: ["links"] },
//       { name: "clipboard", groups: ["undo", "clipboard"] },
//       { name: "insert", groups: ["insert"] },
//       { name: "tools", groups: ["tools"] },
//       { name: "document", groups: ["mode", "document", "doctools"] },
//       "/",
//       {
//         name: "editing",
//         groups: ["find", "selection", "spellchecker", "editing"],
//       },
//       { name: "forms", groups: ["forms"] },
//       { name: "styles", groups: ["styles"] },
//       { name: "colors", groups: ["colors"] },
//       { name: "others", groups: ["others"] },
//       { name: "about", groups: ["about"] },
//     ],
//     removeButtons:
//       "CopyFormatting,RemoveFormat,PageBreak,Iframe,Anchor,PasteFromWord,ShowBlocks,Save,Templates,NewPage,Preview,Print,Find,SelectAll,Scayt,Replace,Form,Checkbox,Format,Radio,TextField,Textarea,Font,Select,Button,FontSize,ImageButton,HiddenField,Styles,TextColor,BGColor,About,BidiRtl,BidiLtr,Language,CreateDiv",
//     removePlugins: "elementspath",
//     resize_enabled: true,
//   };
//   return (
//     <div>
//       <CKEditor
//         config={config}
//         initData={data}
//         type="classic"
//         editorUrl="https://cdn.ckeditor.com/4.17.1/full/ckeditor.js"
//         onInstanceReady={() => {
//           console.log("Editor is ready!");
//         }}
//         onChange={(event) => {
//           const newData = event.editor.getData();
//           console.log(newData);
//           setData(newData);
//         }}
//       />
//     </div>
//   );
// }

// export default RichTextEditor;


/* 
Rich Text Editor V3
Custom build(mathtype, superscript not included)
Package needed:
-> @ckeditor/ckeditor5-react 
-> ckeditor5-custom-build-onlinejudge (For custome build without mathtype)
*/

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build-onlinejudge";

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
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const newData = editor.getData();
          setData(newData);
        }}
      />
    </div>
  );
}

export default RichTextEditor;



/* 
Rich Text Editor V2
Almost all needed features (mathtype not included)
Package needed:
-> @ckeditor/ckeditor5-react 
-> ckeditor5-build-classic-extended (For extended version, more features)
*/


// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicExtended from "ckeditor5-build-classic-extended";

// function RichTextEditor({ data, setData, ...props }) {
//   const config = {
//     placeholder: props.placeholder || "Enter your text here",
//     toolbar: {
//       items: [
//           'heading', '|',
//           'fontfamily', 'fontsize', '|',
//           'alignment', '|',
//           'fontColor', 'fontBackgroundColor', '|',
//           'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
//           'link', '|',
//           'outdent', 'indent', '|',
//           'bulletedList', 'numberedList', 'todoList', '|',
//           'code', 'codeBlock', '|',
//           'insertTable', '|',
//           'imageUpload', 'mediaEmbed', 'blockQuote', '|',
//           'undo', 'redo'
//       ],
//     }
//   };
//   return (
//     <div>
//       <CKEditor
//         editor={ClassicExtended}
//         data={data}
//         config={config}
//         onReady={(editor) => {}}
//         onChange={(event, editor) => {
//           const newData = editor.getData();
//           setData(newData);
//         }}
//       />
//     </div>
//   );
// }

// export default RichTextEditor;



/*
Rich Text Editor V1
Only few features

Package needed:
-> @ckeditor/ckeditor5-react 
-> @ckeditor/ckeditor5-build-classic (For classic version)
*/

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// function RichTextEditor({ data, setData, ...props }) {
//   const config = {
//     placeholder: props.placeholder || "Enter your text here",
//   };
//   return (
//     <div>
//       <CKEditor
//         editor={ClassicEditor}
//         data={data}
//         config={config}
//         onReady={(editor) => {}}
//         onChange={(event, editor) => {
//           const newData = editor.getData();
//           setData(newData);
//         }}
//       />
//     </div>
//   );
// }

// export default RichTextEditor;

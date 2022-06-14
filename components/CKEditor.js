import { useEffect, useState, useRef } from "react";

function MyCKEditor({ text = "", id, onEditorChange, editable }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    setLoaded(true);
  }, []); // run on mounting

  if (loaded) {
    return (
      <CKEditor
        id={id}
        editor={ClassicEditor}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "|",
            "outdent",
            "indent",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
          placeholder: "Description *",
        }}
        data={text}
        onReady={(editor) => {
          if (editor && !editable) {
            editor.enableReadOnlyMode(`${id}`);
            editor.ui.view.toolbar.element.style.display = "none";
          }
        }}
        onChange={(event, editor) => {
          // do something when editor's content changed
          const data = editor.getData();
          console.log({ event, editor, data });
          onEditorChange(data);
        }}
        // onBlur={(event, editor) => {
        //   console.log("Blur.", editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}
      />
    );
  } else {
    return <h3> Loading... </h3>;
  }
}

export default MyCKEditor;

"use client";
import Editor from '@monaco-editor/react';
import { EditorContext } from 'contexts/EditorContext';
import extensionToLanguageMap from "../../utils/languages"
import { useContext, useEffect } from 'react';
import usePublishChanges from "../../hooks/usePublishChanges"

const getLanguageFromFileName = (fileName) => {
  const ext = fileName.split('.').pop();
  return extensionToLanguageMap[ext] || 'javascript'; // Default to 'javascript'
};
let saveTimeOut = null;

const MonacoEditor = ({ autoSave}) => {
  const {publishChanges} = usePublishChanges()
  const {content, setContent} = useContext(EditorContext)

  const changeContent = (value)=>{
    setContent({
      filename: content.filename,
      path: content.path,
      content: value
    })
  }
useEffect(()=>{
  if (autoSave) {
    clearTimeout(saveTimeOut)
    saveTimeOut = setTimeout(async()=>{
    await publishChanges();
    },4000)
  }
},[content, autoSave])

  return (
    <div className="w-full editor">
      <Editor
        height={600}
        onChange={changeContent}
        loading={<span className="loading loading-spinner loading-sm"></span>}
        value={content.content}
        defaultValue={content.content}
        defaultLanguage={getLanguageFromFileName(content.filename)} // Default language
        language={getLanguageFromFileName(content.filename)}
        theme="vs-dark" // Dracula theme
        fileName={content.filename}
        options={{
          fontSize: 14,
          wordWrap:'wordWrapColumn',
          mouseWheelZoom: true,
          contextmenu: false,
          minimap: {
            enabled: false
          },
          selectOnLineNumbers: true,
          readOnly: false,
        }}
        />
        </div>
  );
};

export default MonacoEditor;

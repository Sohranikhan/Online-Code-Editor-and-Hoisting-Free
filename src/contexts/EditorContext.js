"use client"
import { createContext, useState } from "react"

export const EditorContext = createContext({})

export const EditorProvider = ({children})=>{
      const [content, setContent] = useState({filename: 'index.js', path: '/', content: '// Start Coding 😎'})

      return <EditorContext.Provider value={{content, setContent}}>
        {children}
      </EditorContext.Provider>
}


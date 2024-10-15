"use client"
import {EditorProvider} from "../../contexts/EditorContext"

const layout = ({children}) => {
  return (
  <EditorProvider>
    {children}
  </EditorProvider>
  )
}

export default layout
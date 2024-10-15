"use client"
import MonacoEditor from "../Editor/Editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import extensionToLanguageMap from "../../utils/languages"
import { EditorContext } from 'contexts/EditorContext';
import { Button } from "components/ui/button";
import {FileDown } from "lucide-react";
import { useContext } from "react";

const EditorWithLanguageOpt = () => {
    const { content, setContent } = useContext(EditorContext)
    const changeLang = (value) => {
        setContent({
            filename: `index.${value}`,
            content: content.content
        })
    }

    const downloadFile = () => {
        let blb = new Blob([content.content], { type: 'plain/text' })
        let url = URL.createObjectURL(blb)
        let a = document.createElement('a')
        a.href = url
        a.download = content.filename,
            a.click()
    }
    const setFilename = (e)=>{        
        setContent({
            filename: e.target.value,
            content: content.content
        })
    }

    return (
        <div className="w-full h-auto flex flex-col overflow-hidden">
            <div className="options py-1 w-full">
                <div className="w-full flex items-center justify-end gap-x-2">

<input type="text" defaultValue={`${content.filename}`} className="w-auto h-full max-w-24 input input-ghost" onChange={setFilename} />

                {/* Select Language */}
                <Select onValueChange={changeLang} defaultValue={'js'} className="w-auto">
                    <SelectTrigger className="w-auto h-auto">
                        <SelectValue placeholder="Select a language" className="text-foreground" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(extensionToLanguageMap).map((lang) => (
                            <SelectItem key={`${lang}`} value={`${lang}`}> {lang} - {extensionToLanguageMap[lang]}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* Download Button */}
                <Button className="w-auto h-auto flex items-start justify-center gap-x-2" onClick={downloadFile}>
             <FileDown size={19} /></Button>

            </div>
                        </div>
            <MonacoEditor />
        </div>
    )
}

export default EditorWithLanguageOpt
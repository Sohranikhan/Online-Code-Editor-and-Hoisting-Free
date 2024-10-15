"use client"
import MonacoEditor from "../Editor/Editor"
import { Button } from "components/ui/button";
import { Eye, SendHorizontal } from "lucide-react";
import usePublishChanges from "../../hooks/usePublishChanges"
import { useState } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerDescription,
} from "../ui/drawer"
import { DialogTitle } from "@radix-ui/react-dialog";
const EditorWorkspaceOptions = ({ directory }) => {
    const { publishChanges } = usePublishChanges();
    const [autoSave, setAutoSave] = useState(false)

    const publishFileChanges = async () => {
        await publishChanges()
    }

    return (
        <div className="w-full h-auto flex flex-col overflow-hidden">
            <div className="options py-1 w-full">
                <div className="w-full flex items-center justify-end gap-x-2">
                    <Drawer placement="right">
                        <DrawerTrigger className="flex items-center justify-center gap-2"><Eye size={16} />Preview</DrawerTrigger>
                        <DrawerHeader>
                            <DrawerContent>
                                <DialogTitle className="text-xs">
                                    <span className="loading loading-infinity loading-sm"></span>
                                </DialogTitle>
                                <DrawerDescription>
                                    Live Preview
                                </DrawerDescription>
                                <iframe src={`http://localhost:4000/${directory}`} className="w-full h-full"></iframe>
                            </DrawerContent>
                        </DrawerHeader>
                    </Drawer>
                    <span className="text-xs">Auto Save</span>
                    <input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => setAutoSave(e.target.checked)} />
                    {/* Publish Button */}
                    <Button className="w-auto h-fit flex items-start justify-center gap-x-2" onClick={publishFileChanges}>Publish <SendHorizontal size={17} /></Button>
                </div>
            </div>
            <MonacoEditor autoSave={autoSave} />
        </div>
    )
}

export default EditorWorkspaceOptions
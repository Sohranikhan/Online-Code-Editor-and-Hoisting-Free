"use client"
import React, { useState } from 'react';
import { ItemRenderer } from '../Workspace/WorkSpace';
import {Delete, FilePlus, FolderPlus, MoreVertical, Upload } from 'lucide-react';
import { FaFileExport } from 'react-icons/fa';
import Cookie from "js-cookie"
import { useToast } from '../ui/use-toast';
const Folder = ({ folder, reloader, setShowForm }) => {
const {toast} = useToast()
  let token = Cookie.get('token')
  const [isOpen, setIsOpen] = useState(false);


  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const uploadFiles = (e) => {
    if (!token) return
    let file = e.target.files[0]
    const path = folder.path
    const form = new FormData()
    form.append('file', file)
    form.append('path', path)
    const headers = { Authorization: `${token}` }
    fetch('http://localhost:4000/upload-file', {
      method: 'POST',
      headers: headers,
      body: form
    }).then(data => data.json()).then((data) => {
      if (data.success) {
        toast({
          description: data.message,
      })
        reloader()
      } else {
        toast({
          description: data.message,
          variant: "destructive",

      })
      }
    })
  }

  const deleteFolder = () => {
    if (!token) return null;
    const headers = { Authorization: `${token}`, "Content-Type": 'application/json' }
    fetch(`http://localhost:4000/delete-folder`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ folderpath: folder.path })
    }).then((data) => data.json()).then((data) => {
      if (data.success) {
        toast({
          description: data.message,
      })
        reloader()
      }else{

        toast({
          description: data.message,
          variant: "destructive",
        })
        return
      }
    })
  }

  return (
    <div className="ml-1">
      <div className='cursor-pointer flex w-full justify-between items-center'>
        <p onClick={toggleFolder} className='w-full'>
          {isOpen ? `- 📂` : `+ 📁`} {folder?.name}
        </p>
        <div className="dropdown dropdown-end">
          <div tabIndex="0" role="button" className="w-9 h-full">
            <MoreVertical size={19} />
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-max p-2 shadow">

            <li><button className="w-full flex items-start justify-start gap-x-2" onClick={() =>
              setShowForm({
                open: true,
                path: folder.path,
                type: "file"
              })
            }>
              <FilePlus size={19} /> New File</button></li>

            <li>
              <button className="w-full flex items-start justify-start gap-x-2" onClick={() =>
              setShowForm({
                open: true,
                path: folder.path,
                type: "directory"
              })
            }>

              <FolderPlus size={19} /> New Folder</button></li>

            <li>
              <label htmlFor="file" className='w-fit h-fit'><Upload size={19} /> Import Files</label>
              <input type="file" onChange={(e) => uploadFiles(e)} multiple={false} name="file" id="file" hidden className='hidden' />
            </li>

            <li><button className="w-full flex items-start justify-start gap-x-2">
              <FaFileExport size={19} /> Export</button></li>

            <li><button className="w-full flex items-start justify-start gap-x-2" onClick={deleteFolder}>
              <Delete size={19} /> Delete</button></li>
          </ul>
        </div>
      </div>
      {isOpen && (
        <div>
          {folder?.contents.map((item, index) => (
            <ItemRenderer key={index} item={item} reloader={reloader} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;

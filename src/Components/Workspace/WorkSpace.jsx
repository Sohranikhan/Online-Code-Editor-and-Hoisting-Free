"use client";
import React, { useState, useEffect } from 'react';
import Folder from '../Folder/Folder';
import File from '../File/File';
import Cookie from 'js-cookie';
import { Menu } from 'lucide-react';
import DialogInput from '../DialogInput/DialogInput';

const Workspace = ({ directory }) => {
  const [mounted, setMounted] = useState(false);
  const token = Cookie.get('token');
  const [workspace, setWorkspace] = useState([]);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(false); // State to trigger reload
  
  const [showForm, setShowForm] = useState({
    open: false,
    path: directory,
    type: 'file'
  })

  // Fetch the workspace data
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const headers = { Authorization: `${token}`, "Content-Type": 'application/json' };
        const response = await fetch('http://localhost:4000/readdir', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ directory: directory }),
        });
        let jsonRes = await response.json();
        if (jsonRes.success) {
          setWorkspace(jsonRes.files);
        } else {
          setError(jsonRes.message);
        }
      } catch (error) {
        setError('Failed to load workspace.' + error.message);
      }
    };

    if (token && directory) {
      fetchWorkspace();
    }
  }, [token, directory, reload]); // Depend on reload state


  useEffect(() => {
    setMounted(true);
  }, []);

  const reloadFunction = () => setReload((prev) => !prev)


  if (!mounted) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  if (window.innerWidth < 1000) {
    return (
      <>
        <div className="editor w-fit drawer z-[9999]">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content w-fit pt-2">
            <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
              <Menu />
            </label>
          </div>
          <div className="drawer-side pt-16">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu text-base-content min-h-full sm:w-fit w-fit max-w-72 p-1 blurback" id="workspacemin">

              {showForm.open && <DialogInput type={showForm.type} path={showForm.path} setShowForm={setShowForm} reloader={reloadFunction} />}
              <div className="h-11 flex items-center justify-start">
              {error ? <p>{error}</p> :
                <Folder folder={{ name: directory, path: directory, contents: [] }} setShowForm={setShowForm} reloader={reloadFunction} />}
              </div>
              
              <hr className='border-foreground/30 mb-3' />
              <div className='w-full h-[80vh] overflow-y-scroll overflow-x-hidden' >
                {workspace && workspace.map((item, index) => (
                  <ItemRenderer key={index} item={item} reloader={reloadFunction} setShowForm={setShowForm} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="editor max-w-xs">
      {showForm.open && <DialogInput type={showForm.type} path={showForm.path} setShowForm={setShowForm} reloader={reloadFunction} />}

      <div className="h-11 flex items-center justify-start">
      {error ? <p>{error}</p> :
        <Folder folder={{ name: directory, path: directory, contents: [] }} setShowForm={setShowForm} reloader={reloadFunction} />
      }
        </div>
        <hr className='border-foreground/30' />
      <div className='w-full h-full overflow-y-scroll overflow-x-hidden' >
        {workspace && workspace.map((item, index) => (
          <ItemRenderer key={index} item={item} setShowForm={setShowForm} reloader={reloadFunction} />
        ))}
      </div>
    </div>
  );
};

export const ItemRenderer = ({ item, reloader, setShowForm }) => {
  if (item.type === 'file') {
    return <File file={item} reloader={reloader} />;
  } else {
    return <Folder folder={item} setShowForm={setShowForm} reloader={reloader} />;
  }
};

export default Workspace;
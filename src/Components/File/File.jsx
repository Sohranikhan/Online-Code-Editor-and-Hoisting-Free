"use client"
import { EditorContext } from "contexts/EditorContext";
import Cookie from "js-cookie";
import { Delete, Download, MoreVertical } from "lucide-react";
import { useContext } from "react";

const File = ({ file, reloader }) => {
  const token = Cookie.get('token')
  const {setContent} = useContext(EditorContext)
  
const readFile = () =>{
  if (!token) return null;
  const headers = {Authorization: `${token}`, 'Content-Type': 'application/json'}
  fetch(`http://localhost:4000/file-content`,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify({filepath: file.path})
  }).then((data)=>data.json()).then((data)=>{
    if (data.success) {
      setContent({
          filename: file.name,
          path: file.path,
          content: data.content
        })
        return
    }
    setContent({
      filename: file.name,
      path: file.path,
      content: `Something Went Wrong While Reading ${file.name} ${data.message}`
    })
    return
  })
}

const downloadFiles = ()=>{
  fetch(`http://localhost:4000/${file.path}`).then((data)=>data.blob()).then((data)=>{
    let url = URL.createObjectURL(data);
    let a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }
  )
}

const deleteFile = () =>{

  if (!token) return null;
  const headers = {Authorization: `${token}`, "Content-Type": 'application/json'}
  fetch(`http://localhost:4000/delete-file`,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify({filepath: file.path})
  }).then((data)=>data.json()).then((data)=>{
    if (data.success) {
      reloader()
    }else{
      setContent({
        filename: file.name,
        path: file.path,
        content: `Something Went Wrong While Deleting ${file.name}`
      })
    }
  })
}

  return (
    <div className='cursor-pointer ml-5 hover:bg-foreground/10 rounded py-1 flex justify-between items-center'>
    <p onClick={readFile} className="w-full text-nowrap overflow-x-hidden"> 📄 {file.name}</p> 

    <div className="dropdown dropdown-end">
          <div tabIndex="0" role="button" className="w-9 h-full">
            <MoreVertical size={19} />
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-max p-2 shadow">

            <li><button className="w-full flex items-start justify-start gap-x-2" onClick={downloadFiles}>
              <Download size={19} /> Download</button></li>


            <li><button className="w-full flex items-start justify-start gap-x-2" onClick={deleteFile}>
              <Delete size={19} /> Delete</button></li>
          </ul>
        </div>

    </div>
  );
};

export default File;

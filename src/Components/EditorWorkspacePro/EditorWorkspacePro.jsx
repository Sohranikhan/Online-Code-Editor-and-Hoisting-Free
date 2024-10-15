"use client"
import { useEffect, useState } from "react";
import useFetchProjects from "../../hooks/useFetchProjects"
import { Button } from '../ui/button'
import Cookie from "js-cookie";
import Link from "next/link";
import { Menu } from "lucide-react";

const EditorWorkspacePro = () => {
  const name = Cookie.get('name')
  const [mounted, setMounted] = useState(false)
  const { data, error } = useFetchProjects()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className="loading loading-spinner loading-sm"></span>
  }

  if (window.innerWidth < 1000) {
    return (
      <div className="editor">
        <div className="w-max drawer z-[9999]">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content w-fit pt-2">
            <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
              <Menu />
            </label>
          </div>
          <div className="drawer-side pt-16 ">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu text-base-content min-h-full sm:w-[40%] w-[270px] p-1 bg-background overflow-y-scroll" id="workspacemin">
              <h1 className='font-bold text-lg my-2 ml-2'>Your Projects</h1>
              <hr className='border-foreground/30 mb-3' />
              {error && <p>{error}</p>}
{!name && <div className="w-full h-full flex flex-col p-2">
        <p className="py-3 text-warning text-base">Login To Create Projects</p>
        <Button><Link href={`/login?callback=http://localhost:3000/editor`} className="w-full h-full flex items-center justify-center">Login</Link></Button>
      </div>}

<div className="flex flex-col">
      {data?.projects?.length === 0 ? <div className="w-full h-full flex flex-col p-2 ">
        <p className="py-3 text-warning text-base">No Project Found</p>
        <Button><Link href={'/newproject'} className="w-full h-full flex items-center justify-center">Create One</Link></Button>
      </div>:  data?.projects?.map((pro) => (
        <Link href={`/editor/${pro.workdir}`} key={pro.title} className="w-full p-1 ml-2 my-2 text-blue-600">{pro.title}</Link>
      ))}
      </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
return (
  <div className="editor w-full text-base-content min-h-full p-1" id="workspacemin">
              <h1 className='font-bold text-lg my-2 ml-2'>Your Projects</h1>
              <hr className='border-foreground/30 mb-3' />
              {error && <p>{error}</p>}
{!name && <div className="w-full h-full flex flex-col p-2">
        <p className="py-3 text-warning text-base">Login To Create Projects</p>
        <Button><Link href={`/login?callback=http://localhost:3000/editor`} className="w-full h-full flex items-center justify-center">Login</Link></Button>
      </div>}

<div className="flex flex-col">
      {data?.projects?.length === 0 ? <div className="w-full h-full flex flex-col p-2 ">
        <p className="py-3 text-warning text-base">No Project Found</p>
        <Button><Link href={'/newproject'} className="w-full h-full flex items-center justify-center">Create One</Link></Button>
      </div>:  data?.projects?.map((pro) => (
        <Link href={`/editor/${pro.workdir}`} target="_top" key={pro.title} className="w-full p-1 ml-2 my-2 text-blue-600">{pro.title}</Link>
      ))}
      </div>

            </div>
)
}

export default EditorWorkspacePro
"use client"
import { Button } from "../ui/button"
import Cookie from "js-cookie"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const SigninSignoutBtn = ({className}) => {
  const router = useRouter()
  const [curruntUrl, setCurruntUrl] = useState('/')
  const [mounted, setMounted] = useState(false)
  let token = Cookie.get('token')
  let userName = Cookie.get('name')
  
  useEffect(() => {
    setMounted(true)
    setCurruntUrl(window.location.href)
    }, [])  

const removeCookie = ()=>{
  Cookie.remove('token')
  Cookie.remove('name')
  router.push('/')
}

  if (!mounted) {
    return <span className="loading loading-spinner loading-sm"></span>
  }
 return (
<div className="flex-none gap-2">
  { token?
    <div className="dropdown dropdown-end">
      <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-10 rounded-full">
<p className="w-full h-full flex items-center justify-center rounded-full bg-primary">{userName.slice(0,1)}</p>
        </div>
      </div>
      <ul
        tabIndex="0"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">  
              {userName}
              <span className="badge">🟢</span>
            </a>
          </li>
         <Button className={`${className} py-1 px-3 rounded`} onClick={removeCookie}>Log Out</Button> 
      </ul>
    </div> 
    : <Link href={`/login?callback=${curruntUrl}`} className={`${className} bg-primary rounded py-1 px-3 flex items-center justify-center`}>Log In</Link>
  }

  </div>
    )
}
 
export default SigninSignoutBtn;
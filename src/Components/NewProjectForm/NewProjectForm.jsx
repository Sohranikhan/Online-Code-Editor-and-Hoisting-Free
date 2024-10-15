"use client"
import Cookie from "js-cookie"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const NewProjectForm = () => {
    const router = useRouter()
    const token = Cookie.get('token')
    const [curruntUrl, setCurruntUrl] = useState('/')
    const [error, setError] = useState(null)

    useEffect(() => {
    setCurruntUrl(window.location.href)
    }, [])
     
    const projectSubmit = async(e) => {
        e.preventDefault()
        if (!token) {
            return router.push(`/login?callback=${curruntUrl}`)
           }
            const proTitle = e.target[0].value
            const file = e.target[1].files[0]
            const check = e.target[2].checked
        if (proTitle.length > 5) {
            if (file || check) {
             setError(null)
             
             const headers = {Authorization: `${token}`}
             const form = new FormData()
             form.append('title', proTitle)
             form.append('file', file)
             form.append('checkbox', check)
             
             const res = await fetch('http://localhost:4000/host',{
                 method: 'POST',
                headers: headers,
                body: form
             })
             const jsonRes = await res.json()
             if (jsonRes.success) {
                return router.push(`/`)
             }
             setError(jsonRes.message)
             return null;
            } else {
                setError("Please upload a zip file or check the checkbox to start from empty project")
            }
        } else {
            setError("Project name should be contain minimum 5 letters.")
        }


    }
    return (
        <form onSubmit={async(e) => await projectSubmit(e)} className="w-full flex flex-col gap-y-1 justify-start max-w-lg mx-auto p-2">
            <label htmlFor="title" className="label">Enter Project Title</label>
            <input type="text" name="title" className="input input-bordered w-full" placeholder="Nature Beauty" />

            <label htmlFor="file" className="label">Upload Project .zip File</label>
            <input type="file" name="file" className="input file-input-bordered file-input file-input-primary w-full" />


            <label htmlFor="check" className="label">Or Start From scratch</label>
            <input type="checkbox" name="check" className="checkbox-primary checkbox" />
            {error && <p className="text-warning">{error}</p>}
            <Button className="my-3">Host</Button>
        </form>
    )
}

export default NewProjectForm
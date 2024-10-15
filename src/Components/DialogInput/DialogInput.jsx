import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import Cookie from "js-cookie"

const DialogInput = ({path, type, reloader, setShowForm}) => {
    const { toast } = useToast()
    const token = Cookie.get('token')

    const handleAddFileFolder = (e) => {
        e.preventDefault()
        if (!token) return null;
        let fileName = e.target[0].value
        if (!fileName || fileName.length < 2){
            toast({
                description: data.message,
                variant: "destructive",
            }) 
            return null
        } 
    
        if (type === 'directory') {
            const headers = { Authorization: `${token}`, 'Content-Type': 'application/json' }
            fetch('http://localhost:4000/create-folder', {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ folderName:fileName, relpath: path })
            }).then(data=> data.json()).then((data)=>{
                console.log(data);
                if (data.success===false){
                    toast({
                        description: data.message,
                        variant: "destructive",
                    })
                }
                reloader()
                setShowForm({
                    open: false,
                    type: 'file'
                })
                return
            })

        }else{    
        const headers = { Authorization: `${token}`, 'Content-Type': 'application/json' }
        fetch('http://localhost:4000/create-file', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ fileName, relpath: path })
        }).then(data=> data.json()).then((data)=>{
            if (data.success===false){
                toast({
                    description: data.message,
                    variant: "destructive",
                })
            }
            reloader()
            setShowForm({
                open: false,
                type: 'file'
            })
            return 
        })
    }
    }

    return (
                <form onSubmit={handleAddFileFolder} className="w-full flex flex-col items-start justify-start" onBlur={()=> setShowForm((prev) => ({...prev, open: false}))}>
                    <div className="w-full flex items-center justify-between">
                    <input id="name" type="text" className="w-auto input input-bordered input-primary px-2 focus h-9" autoFocus />
                    <Button type="submit" className="hidden" hidden></Button>
                    </div>
                    </form>
    )
}

export default DialogInput
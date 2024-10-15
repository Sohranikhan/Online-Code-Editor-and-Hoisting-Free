"use client"
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { useEffect, useState } from "react";

const NewProjectsShow = () => {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(null)

  let count = 0
    useEffect(() => {
        count++
        try {
        setTimeout(()=> {},1000)
        const fetchProjects = async () => {
            const response = await fetch(`http://localhost:4000/allnewprojects?page=${page}`);
            if (response.ok) {
              const data = await response.json();        
              if (data.success) {
                setProjects((prev)=> [...prev, ...data.projects]);
                setHasMore(data.hasMore);
                return;
              }
            setError(data.message)
            return;
            }
            setError(response.text)
            return;
        };
        if (count !== 2) {
            fetchProjects()
        }
      } catch (error) {
          
      }
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMore) {
              setPage(page + 1);
            }
          };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [page, hasMore]);
  
    if (projects.length === 0 || error) {
      return <p>No Data Found, {error ? error : ''}</p>
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Card key={project?._id} className="w-auto max-w-xs mx-auto">
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>Developer Name: <b className="font-bold text-base text-foreground">{project?.userId?.name}</b></CardDescription>
            </CardHeader>
            <CardContent>
                <iframe src={`http://localhost:4000/${project.workdir}`} sandbox='' className="w-auto max-w-xs h-auto max-h-36"></iframe>
                <Link href={`http://localhost:4000/${project.workdir}`} target="_blank" className="btn btn-primary w-full my-1">View Page </Link>
            </CardContent>
          </Card>
        ))}
        {hasMore && <div className="w-full h-full flex items-center justify-center"><span className="loading loading-spinner loading-sm"></span></div>}
      </div>
    );
}

export default NewProjectsShow
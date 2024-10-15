"use client";
import { useEffect, useState } from "react";
import useFetchProjects from "../../hooks/useFetchProjects"

const UserProjects = () => {
  const [mounted, setMounted] = useState(false)
  const {data, error} = useFetchProjects()

  useEffect(() => {
  setMounted(true)
  }, [])
  
  if (!mounted) {
    return <span className="loading loading-spinner loading-sm"></span>
  }
  if (data?.projects?.length === 0 ) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <p className="text-base my-3">No project Found</p>
        </div>
    )
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Your Projects</h1>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
{data.success && data?.projects?.map((project, index) => (
            <tr key={index}>
              <th>
                {index + 1}
              </th>
              <td>
                <a href={`http://localhost:4000/${project.workdir}`} target="_blank"
                  className="link link-primary">
                  {project.title}
                </a>
              </td>
              <td>
                <div className="dropdown dropdown-end">
                  <div tabIndex="0" role="button" className=" m-1"><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"
                    width="20" height="20" fill="gray">
                    <path
                      d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg></div>
                  <ul tabIndex="0"
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-max p-2 shadow">
                    <li><a href={`/editor/${project.workdir}`}
                      target="_blank"><svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512" width="20" height="20"
                        fill="gray">
                        <path
                          d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                      </svg> Open in CodeSpace</a></li>
                    <li><button type="submit"
                      onClick={deletePro(project.workdir)}
                      className="w-full h-full flex"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                        width="20" height="20" fill="gray">
                        <path
                          d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg> Delete</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {error && <p className="text-warning">{error}</p>}
    </div>
  );
};

export default UserProjects;

import NewProjectForm from "../../components/NewProjectForm/NewProjectForm"

const createProjectPage = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center">
<h1 className="text-4xl font-bold my-3">Host Your Project 🎊</h1>
  <NewProjectForm />
    </div>
  )
}

export default createProjectPage
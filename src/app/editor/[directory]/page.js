import Workspace from '../../../components/Workspace/WorkSpace'
import EditorWorkspaceOptions from '../../../components/EditorWorkspaceOptions/EditorWorkspaceOptions'

const EditorPage = ({params}) => {
const directory = params.directory

  return (
    <div className='w-full h-auto flex overflow-hidden'>
        <div className="workspace w-fit lg:flex-[1]">
      <Workspace directory={directory} />
        </div>
        <div className="flex-[4]">
      <EditorWorkspaceOptions directory={directory} />
        </div>
    </div>
  )
}

export default EditorPage
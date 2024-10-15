import EditorWorkspacePro from "../../components/EditorWorkspacePro/EditorWorkspacePro"
import EditorWithLanguageOpt from "../../components/EditorWithLanguageOpt/EditorWithLanguageOpt"

const EditorPage = () => {  
  return (
    <div className='w-full h-auto flex overflow-hidden'>
        <div className="workspace w-fit lg:flex-[1]">
       <EditorWorkspacePro />
        </div>
        <div className="flex-[4]">
        <EditorWithLanguageOpt />
        </div>
    </div>
  )
}

export default EditorPage
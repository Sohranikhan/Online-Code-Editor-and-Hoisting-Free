import Link from "next/link"
import SideMenu from "../SideMenu/SideMenu"
import SigninSignoutBtn from "components/SigninSignoutBtn/SignInSignOutBtn"
import { ArrowBigDownDash } from "lucide-react"

const Navbar = () => {
  return (
    <div className="w-full h-11 flex flex-col items-center justify-center fixed p-0 top-0 left-0 z-50 navbar blurback">
      <div className="upperNav w-full h-10 flex items-center justify-between p-0 sm:p-2">
          <Link href="/" className="flex gap-2">
            <ArrowBigDownDash /> Akdevz
          </Link>
        {/* Side Menu */}
        <div className=" flex gap-x-2">
           <SigninSignoutBtn />
        <div className="flex items-center sm:hidden">
          <SideMenu />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
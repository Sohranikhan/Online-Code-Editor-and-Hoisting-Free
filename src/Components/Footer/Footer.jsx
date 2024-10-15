import { Mail } from "lucide-react"
import Link from "next/link"

const Footer = async() => {

  return (
    <div className="w-full h-auto flex items-center gap-x-10 justify-center flex-wrap bg-base-100 mt-10 min-h-48">
      <Link href={'mailto: sohailppp1121@gmsil.com'} className="flex items-center justify-center gap-x-2"> <Mail/> sohailppp1121@gmsil.com</Link>
      <p>Akdevz: &copy; All rights reserved</p>
      </div>
  )
}

export default Footer
import { Building, Crown, DoorOpen, Home, LogIn, Menu, UserCircle, GraduationCap } from "lucide-react"
import Image from "next/image"
// import { useMediaQuery } from "../../hooks/use-media-query"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../../components/ui/sheet"
  import { ScrollArea } from "../../components/ui/scroll-area"
import SigninSignoutBtn from "components/SigninSignoutBtn/SignInSignOutBtn"

const SideMenu = async() => {
return(
        <Sheet>
    <SheetTrigger className="w-fit h-fit sm:hidden">    
        <div className="mx-2 px-3 py-2 bg-primary rounded ">
    <Menu size={18}  color="white"/>
    </div>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
JsRunner
        </SheetTitle>
        <SheetDescription></SheetDescription>
        <ScrollArea className="h-screen w-full p-2 flex flex-col gap-y-1">
<div className="h-auto overflow-y-scroll w-auto p-2 flex flex-col items-center justify-start gap-y-1">
    <SigninSignoutBtn />
</div>
</ScrollArea>
    </SheetHeader>
  </SheetContent>
</Sheet>
)
}

export default SideMenu